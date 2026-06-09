insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "uploads public read" on storage.objects;
create policy "uploads public read" on storage.objects
  for select to public
  using (bucket_id = 'uploads');

drop policy if exists "uploads authenticated insert" on storage.objects;
create policy "uploads authenticated insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'uploads');

drop policy if exists "uploads authenticated update" on storage.objects;
create policy "uploads authenticated update" on storage.objects
  for update to authenticated
  using (bucket_id = 'uploads')
  with check (bucket_id = 'uploads');

drop policy if exists "uploads authenticated delete" on storage.objects;
create policy "uploads authenticated delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'uploads');

select id, name, public from storage.buckets where id = 'uploads';
