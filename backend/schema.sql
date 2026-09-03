-- 우리의 기억 — Supabase 백엔드 스키마
-- 사용법: Supabase 대시보드 > SQL Editor > 붙여넣기 > Run (1회)

create table if not exists places (
  id text primary key,
  name text not null default '',
  lat double precision,
  lng double precision,
  date text default '',
  note text default '',
  thumb text default '',
  photos jsonb default '[]',
  deleted boolean default false,
  updated_at bigint default 0
);

create table if not exists bucket (
  id text primary key,
  title text not null default '',
  done boolean default false,
  done_date text default '',
  deleted boolean default false,
  updated_at bigint default 0
);

alter table places enable row level security;
alter table bucket enable row level security;

-- 개인(커플) 스케일: anon 키 소지자에게 읽기/쓰기 허용.
-- 키가 곧 열쇠이므로 링크/키를 둘 외에 공유하지 말 것.
create policy "couple rw places" on places for all using (true) with check (true);
create policy "couple rw bucket" on bucket for all using (true) with check (true);

-- 사진 저장 버킷
insert into storage.buckets (id, name, public) values ('photos', 'photos', true)
  on conflict (id) do nothing;
create policy "couple rw photo objects" on storage.objects
  for all using (bucket_id = 'photos') with check (bucket_id = 'photos');
