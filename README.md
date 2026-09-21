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

## Architecture

- `app/page.tsx` loads the board on the server.
- `components/project-board.tsx` contains filtering and the interactive experience.
- `components/idea-modal.tsx` validates and submits new ideas.
- `app/api/projects/route.ts` exposes `GET /api/projects` and `POST /api/projects`.
- `data/projects.json` is the zero-config local datastore. Published ideas are saved here and persist through restarts.

## Contact field

Use either a Telegram username (such as `@qairu_team`) or a complete `https://t.me/...` URL. The join button opens it in a new tab.

## Deployment note

The bundled JSON store is ideal for local demos and a single persistent server. Most serverless hosts have read-only/ephemeral filesystems; replace `lib/projects.ts` with Supabase, Prisma, or another managed store before deploying there.
