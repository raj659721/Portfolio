import type { Express } from "express";
import { createServer, type Server } from "http";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function checkSupabaseTables() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log("Supabase credentials not configured");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { error } = await supabase.from('contact_submissions').select('id').limit(1);
    
    if (error) {
      console.log("\n╔══════════════════════════════════════════════════════════════╗");
      console.log("║           SUPABASE TABLE SETUP REQUIRED                      ║");
      console.log("╠══════════════════════════════════════════════════════════════╣");
      console.log("║ Go to your Supabase Dashboard > SQL Editor and run:          ║");
      console.log("╚══════════════════════════════════════════════════════════════╝\n");
      console.log(`
-- Create contact submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for contact form)
CREATE POLICY "Allow anonymous insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow reading for authenticated users only
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
      `);
      console.log("\n════════════════════════════════════════════════════════════════\n");
    } else {
      console.log("Supabase contact_submissions table is ready!");
    }
  } catch (err) {
    console.log("Supabase check completed");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await checkSupabaseTables();

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}
