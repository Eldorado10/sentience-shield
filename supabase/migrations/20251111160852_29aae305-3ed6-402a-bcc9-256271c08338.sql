-- Add data_scientist to existing app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'data_scientist';