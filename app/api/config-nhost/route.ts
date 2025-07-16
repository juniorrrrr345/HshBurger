import { NextRequest, NextResponse } from 'next/server';
import { SiteConfig } from '../../lib/config';

const NHOST_URL = process.env.NEXT_PUBLIC_NHOST_URL || 'http://localhost:1337';
const GRAPHQL_URL = process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL || 'http://localhost:8080/v1/graphql';

export async function GET() {
  try {
    console.log('GET /api/config-nhost - Starting fetch process');
    
    const query = `
      query GetSiteConfig {
        site_config(where: {id: {_eq: 1}}) {
          config
          updated_at
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'nhost-admin-secret',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('GET /api/config-nhost - Response:', data);

    if (data.data?.site_config?.[0]?.config) {
      return NextResponse.json(data.data.site_config[0].config);
    }

    return NextResponse.json({});
  } catch (error) {
    console.error('GET /api/config-nhost - Error:', error);
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/config-nhost - Starting save process');
    
    const config: SiteConfig = await request.json();
    console.log('POST /api/config-nhost - Config to save:', Object.keys(config));

    const mutation = `
      mutation UpsertSiteConfig($id: Int!, $config: jsonb!, $updated_at: timestamptz!) {
        insert_site_config_one(
          object: {
            id: $id,
            config: $config,
            updated_at: $updated_at
          },
          on_conflict: {
            constraint: site_config_pkey,
            update_columns: [config, updated_at]
          }
        ) {
          id
          config
          updated_at
        }
      }
    `;

    const variables = {
      id: 1,
      config: config,
      updated_at: new Date().toISOString()
    };

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'nhost-admin-secret',
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('POST /api/config-nhost - Response:', data);

    if (data.errors) {
      console.error('POST /api/config-nhost - GraphQL errors:', data.errors);
      return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data.data?.insert_site_config_one });
  } catch (error) {
    console.error('POST /api/config-nhost - Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}