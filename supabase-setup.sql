-- =======================================================
-- TECHNEXASTORE Database Setup Script for Supabase
-- Copy and paste this entire script into your Supabase SQL Editor and click RUN
-- =======================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Mens', 'Womens', 'Kids', 'Accessories')),
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
  colors TEXT[] DEFAULT ARRAY['Standard'],
  image TEXT NOT NULL,
  badge TEXT,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 12,
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Orders Table (for customer orders placed via WhatsApp / Site)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT DEFAULT 'Pakistan',
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'Cash on Delivery',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
  whatsapp_sent BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Admin Settings Table (for password & store info)
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY,
  admin_password TEXT NOT NULL,
  store_phone TEXT DEFAULT '03287205940',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Admin Password (technexa1122)
INSERT INTO public.admin_settings (id, admin_password, store_phone)
VALUES ('config', 'technexa1122', '03287205940')
ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS) but allow public read for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view products
CREATE POLICY "Public can view products" 
ON public.products FOR SELECT USING (true);

-- Allow inserting/updating products
CREATE POLICY "Public can insert or update products" 
ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Allow creating orders
CREATE POLICY "Public can insert orders" 
ON public.orders FOR INSERT WITH CHECK (true);

-- Allow reading orders (for admin)
CREATE POLICY "Public can read orders" 
ON public.orders FOR SELECT USING (true);

-- Allow update orders
CREATE POLICY "Public can update orders" 
ON public.orders FOR UPDATE USING (true);

-- Allow reading/updating admin settings
CREATE POLICY "Allow admin settings access" 
ON public.admin_settings FOR ALL USING (true) WITH CHECK (true);

-- 5. Create Storage Bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to product-images bucket
CREATE POLICY "Public Access for product images" 
ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Public upload for product images" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
