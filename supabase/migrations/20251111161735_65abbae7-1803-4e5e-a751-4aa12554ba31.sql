-- Allow inserting roles for new users (needed during signup)
CREATE POLICY "Allow role assignment during signup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update the handle_new_user trigger to assign data_scientist role for scientist email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  
  -- Assign role based on email domain for demo users
  IF NEW.email = 'admin@mindcare.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSIF NEW.email = 'scientist@mindcare.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'data_scientist');
  ELSE
    -- Assign default user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$;