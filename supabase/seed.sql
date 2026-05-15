-- myweb seed data
-- Run AFTER 0001_init.sql.
-- Inserts the 10 demos listed in PLAN.md §4.

insert into public.demos (slug, category, title_key, description_key, base_price_usd, tech_tags, featured, display_order)
values
  ('shop',        'ecommerce',  'demos.shop.title',       'demos.shop.description',       499,  array['web','responsive','payments'],          true,  1),
  ('gym',         'fitness',    'demos.gym.title',        'demos.gym.description',        599,  array['web','members','scheduling'],           true,  2),
  ('accounting',  'business',   'demos.accounting.title', 'demos.accounting.description', 799,  array['web','reports','exports'],              false, 3),
  ('china-uni',   'education',  'demos.china_uni.title',  'demos.china_uni.description',  999,  array['web','documents','multi-role'],         true,  4),
  ('school',      'education',  'demos.school.title',     'demos.school.description',     699,  array['web','gradebook','parent-portal'],      false, 5),
  ('university',  'education',  'demos.university.title', 'demos.university.description', 899,  array['web','enrollment','transcripts'],       false, 6),
  ('restaurant',  'hospitality','demos.restaurant.title', 'demos.restaurant.description', 599,  array['web','pos','online-ordering'],          false, 7),
  ('pim',         'productivity','demos.pim.title',       'demos.pim.description',        399,  array['web','contacts','documents'],           false, 8),
  ('clinic',      'healthcare', 'demos.clinic.title',     'demos.clinic.description',     799,  array['web','appointments','patient-portal'], false, 9),
  ('logistics',   'operations', 'demos.logistics.title',  'demos.logistics.description',  899,  array['web','maps','tracking'],                false, 10)
on conflict (slug) do nothing;
