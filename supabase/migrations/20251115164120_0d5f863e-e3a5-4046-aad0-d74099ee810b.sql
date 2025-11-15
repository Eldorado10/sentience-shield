-- Add new roles to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'patient';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'it_expert';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'mental_health_researcher';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'psychologist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'emergency_response_team';