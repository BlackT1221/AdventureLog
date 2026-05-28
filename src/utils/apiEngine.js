const SUPABASE_URL = 'https://udmfhnhfbjiajczzuuxj.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbWZobmhmYmppYWpjenp1dXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTY2NDYsImV4cCI6MjA5NTU3MjY0Nn0.9s8C8tzCVGcDOFZ1iRDLtD9bZiC3fjCpDNEfCeY1DqM';

export const fetchAdventures = async () => {
    try {
        const response = await fetch(`${SUPABASE_URL}adventures?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Código ${response.status}: ${errorText}`);
        }
        return await response.json();
    } catch (error){
        console.error('API Error: ', error);
        return [];
    }
};