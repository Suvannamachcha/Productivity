// Initialize Supabase client for authentication and database
const supabaseUrl = 'https://oxclvnkiiaquhujbdnjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y2x2bmtpaWFxdWh1amJkbmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDM4NDEsImV4cCI6MjA0NzUxOTg0MX0.4V4WNwq8ktDKP8xmbOFgrO_emDBkITpfwk3H9IlKPv0';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Redirect to login if user is not authenticated
supabase.auth.getUser().then(({ data: user }) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});

// Logout function
function logout() {
  supabase.auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}

