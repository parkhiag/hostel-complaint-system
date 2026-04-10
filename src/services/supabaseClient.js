import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cdgzbivsbgxjcxjfoejw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZ3piaXZzYmd4amN4amZvZWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNDUwODIsImV4cCI6MjA5MDkyMTA4Mn0.i1eexMz7yLckd963y3RTRCnYchTpWp48f_pJIbQxt8M"

export const supabase = createClient(supabaseUrl, supabaseKey)