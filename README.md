# QAIRU Hub Project Board

A polished project-discovery board for university students. Students can publish ideas, filter by skills, and open a creator's Telegram/contact link directly from a project card.

## Run locally

1. Install Node.js 18.17 or newer.
2. From this project folder, install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

For a production check, run `npm run build` and then `npm start`.

## Подключение Supabase (обязательно для Vercel)

1. Откройте **Supabase Dashboard → SQL Editor → New query**.
2. Скопируйте и выполните весь код из [supabase/schema.sql](./supabase/schema.sql). Он создаст таблицу `projects` и безопасные правила доступа.
3. В Vercel откройте **Project → Settings → Environment Variables** и добавьте обе переменные из `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Выполните Redeploy проекта.

Файл `.env.local` уже исключён из Git. Не добавляйте в него `service_role` ключ.

## Архитектура

- `app/page.tsx` loads the board on the server.
- `components/project-board.tsx` contains filtering and the interactive experience.
- `components/idea-modal.tsx` validates and submits new ideas.
- `app/api/projects/route.ts` exposes `GET /api/projects` and `POST /api/projects`.
- `utils/supabase/` содержит клиенты Supabase для браузера, сервера и middleware.
- `supabase/schema.sql` создаёт таблицу и политики безопасности.

## Contact field

Use either a Telegram username (such as `@qairu_team`) or a complete `https://t.me/...` URL. The join button opens it in a new tab.
