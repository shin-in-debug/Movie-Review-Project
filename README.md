# Movie Review Platform — Frontend (TNova Week 6, Day 37)

A React (Vite) mini project that combines everything from Days 32–36:
components & props, state & events, lists & keys, conditional rendering,
forms & validation, and `useEffect`. All data is **simulated** (`setTimeout`).
In Week 7 it will be connected to the real Spring Boot backend.

---

## 1. How to run

Requirements: Node.js 18+ and npm.

```bash
npm install      # install dependencies (once)
npm run dev      # start dev server -> open http://localhost:5173
npm run build    # production build (optional)
```

---

## 2. Folder structure

```
movie-review-ui/
├── index.html              # Single HTML page; has <div id="root">
├── package.json            # Project name, scripts, dependencies
├── vite.config.js          # Vite config (enables React plugin)
├── .gitignore              # Ignore node_modules and dist
├── README.md               # This file
└── src/
    ├── main.jsx            # Entry point: starts React inside #root
    ├── App.jsx             # Root component; holds shared filterText state
    ├── App.css             # All styles
    └── components/
        ├── MovieCard.jsx   # One movie + favorite toggle (own state)
        ├── MovieList.jsx   # Simulated loading, filtering, .map() list
        ├── SearchBar.jsx   # Controlled input for live search
        ├── MovieForm.jsx   # Add-movie form with validation
        ├── ReviewCard.jsx  # One review (display only)
        └── ReviewList.jsx  # Simulated loading of reviews
```

| File | Role |
|---|---|
| `index.html` | The only HTML page. React draws the whole UI inside `<div id="root">`. |
| `main.jsx` | Runs first. Connects React to `#root` and loads `App` and the CSS. |
| `App.jsx` | Parent of everything. Owns `filterText` because two siblings share it. |
| `components/` | One reusable component per file. |

### Component tree

```
App (filterText state)
 ├── SearchBar      -> sends typed text UP via onFilterChange
 ├── MovieForm      -> sends new movie UP via onAddMovie
 ├── MovieList      <- receives filterText (props flow DOWN)
 │     └── MovieCard x N   (each has its own isFavorite state)
 └── ReviewList
       └── ReviewCard x N
```

Data flows **down** by props; events flow **up** by callback functions.

---

## 3. Checkpoints (build order for the student)

| # | Time | Build |
|---|---|---|
| 1 | 25 min | MovieCard, MovieList, ReviewCard with props and a hardcoded array (no state yet) |
| 2 | 35 min | Favorite toggle (`useState`), SearchBar (controlled input), `.map()` with `key` |
| 3 | 30 min | MovieForm: one state object, one `handleChange`, inline errors, disabled submit |
| 4 | 30 min | `useEffect` + `useState` with 1-second delay, loading and empty states |

---

## 4. Test checklist

| Test | Expected result |
|---|---|
| Open the page | "Loading movies..." for 1 second, then 3 cards |
| Click ☆ on one card | Only that card turns gold, button shows "★ Favorited" |
| Type `inc` in search | Only Inception remains (no submit button) |
| Type `xyz` | "No movies found." |
| Empty form | "Add Movie" button disabled |
| Rating 15 | Red error message |
| Valid form + submit | Console logs the movie, form clears, no page reload |

---

# தமிழ் விளக்கம் (Concepts in Tamil)

## 1. Component & Props
- **Component** என்பது UI-ஐ சிறு சிறு மறுபயன்பாட்டு (reusable) துண்டுகளாகப் பிரிப்பது.
- **Props** என்பது parent component கொடுக்கும் data. Child அதை **மாற்ற முடியாது** (read-only).
- உதாரணம்: பார்சல் பெட்டி design ஒன்றே, உள்ளே வைக்கும் உணவு வேறு. அதுபோல `MovieCard` ஒன்றே, `title` props வேறு.
- `function MovieCard({ title, rating })` — இது props-ஐ **destructuring** செய்வது.
- `className` பயன்படுத்துவது ஏனெனில் `class` JavaScript-ல் reserved word.

## 2. State (`useState`)
- **State** என்பது component தானே வைத்திருக்கும், மாறக்கூடிய data. மாறினால் screen தானாக refresh (re-render) ஆகும்.
- `const [isFavorite, setIsFavorite] = useState(false);`
  - `isFavorite` = தற்போதைய மதிப்பு
  - `setIsFavorite` = மதிப்பை மாற்றும் function
  - `false` = ஆரம்ப மதிப்பு
- **Props vs State:** Props வெளியிலிருந்து வருவது (மாற்ற முடியாது). State உள்ளே இருப்பது (மாற்றலாம்).
- ஒவ்வொரு card-க்கும் தனி favorite நிலை வேண்டும் என்பதால் state `MovieCard`-க்குள் உள்ளது.

## 3. Events
- User செய்யும் செயலுக்கு (click, type, submit) பதில் அளிப்பது.
- `onClick={() => setIsFavorite(!isFavorite)}` சரி. Click செய்தால் மட்டுமே இயங்கும்.
- `onClick={setIsFavorite(!isFavorite)}` தவறு. Render நேரத்திலேயே இயங்கிவிடும்.

## 4. Lists & Keys
- `.map()` array-ஐ JSX elements-ஆக மாற்றும். `.forEach()` எதுவும் return செய்யாது, அதனால் பயன்படாது.
- `key={m.id}` ஒவ்வொரு item-ஐயும் React அடையாளம் காண உதவும்.
- Index-ஐ key-ஆகப் பயன்படுத்தக் கூடாது. Filter/வரிசை மாறினால் தவறான data தவறான card-உடன் இணையும். ரேஷன் கார்டு எண் போல நிலையான `id` வேண்டும்.
- `{...m}` என்பது `id`, `title`, `rating` அனைத்தையும் props-ஆக ஒரே நேரத்தில் அனுப்பும் (spread).

## 5. Conditional Rendering
- நிலைக்கு ஏற்ப வேறு UI காட்டுவது.
- `MovieList`-ல் வரிசை முக்கியம்:
  1. `loading` true → "Loading movies..."
  2. Filter செய்த பின் காலி → "No movies found."
  3. இல்லையெனில் → cards
- `{condition && <small>...</small>}` — condition true ஆனால் மட்டுமே காட்டும்.

## 6. Controlled Input & Lifting State Up (`SearchBar`)
- `value={text}` + `onChange` = **Controlled input**. Input-ல் காட்டுவதை React state கட்டுப்படுத்தும்.
- ஒவ்வொரு key அழுத்தத்திலும் `onChange` இயங்குவதால் submit button இல்லாமலேயே live search வேலை செய்யும்.
- `SearchBar`-ம் `MovieList`-ம் sibling components. அவை நேரடியாகப் பேச முடியாது. அதனால் shared parent `App` `filterText`-ஐ வைத்திருக்கிறது. இதுவே **Lifting State Up**.
- `.toLowerCase()` பயன்படுத்துவதால் search பெரிய/சிறிய எழுத்து வேறுபாடு பார்க்காது.

## 7. Forms & Validation (`MovieForm`)
- **ஒரே state object** மூன்று fields-க்கும்.
- **ஒரே `handleChange`:** `[e.target.name]` (computed key) input-ன் `name`-ஐப் பொறுத்து `title`, `genre` அல்லது `rating`-ஐ மாற்றும்.
- `...form` (spread) மற்ற fields அழியாமல் நகலெடுக்கும்.
- `errors` ஒவ்வொரு render-லும் கணக்கிடப்படுகிறது. State-ல் சேமிக்கவில்லை, அதனால் ஒருபோதும் பொருந்தாமல் போகாது.
- `disabled={!isFormValid}` — தவறான data இருந்தால் submit button செயலிழக்கும். (Bank clerk காலி form-ஐ வாங்காதது போல.)
- `e.preventDefault()` — Browser-ன் default submit (page reload) தடுக்கும். Reload ஆனால் React state அழியும்.
- **Client validation** = உடனடி feedback. **Backend validation** = உண்மையான பாதுகாப்பு. இரண்டும் தேவை.
- `form.rating === ""` சோதனை முக்கியம். இல்லையெனில் காலி மதிப்பு JavaScript-ல் `0` ஆகி valid ஆகிவிடும்.

## 8. useEffect & Cleanup (`MovieList`, `ReviewList`)
- **Side effect** = JSX return செய்வதற்கு அப்பால் செய்யும் வேலை (data fetch, timer). அதற்கான hook `useEffect`.
- `useEffect(() => {...}, [])` — `[]` என்றால் முதல் render-க்குப் பிறகு **ஒரே ஒரு முறை** மட்டும் இயங்கும்.
- `setTimeout(..., 1000)` — 1 வினாடி server தாமதத்தை நடிக்கிறது. Week 7-ல் இது உண்மையான `fetch` call ஆக மாறும்.
- `return () => clearTimeout(timer)` — **Cleanup function**. Component மறைந்தால் timer நிறுத்தப்படும். இல்லையெனில் memory leak, stale update ஏற்படும்.
- உதாரணம்: ஹோட்டலில் சமையல் முடியும் வரை "Preparing..." காட்டுவது = `loading` state.

## 9. File-வாரியாக சுருக்கம்

| File | என்ன செய்கிறது | பயன்படுத்தும் concept |
|---|---|---|
| `main.jsx` | React-ஐத் தொடங்கும் | Entry point |
| `App.jsx` | எல்லாவற்றையும் இணைக்கும் | State, Lifting state up |
| `SearchBar.jsx` | Live search input | Controlled input, Events |
| `MovieForm.jsx` | Movie சேர்க்கும் form | Form state, Validation, preventDefault |
| `MovieList.jsx` | Load, filter, list | useEffect, Lists, Keys, Conditional rendering |
| `MovieCard.jsx` | ஒரு movie + favorite | Props, State, Events |
| `ReviewList.jsx` | Reviews load செய்யும் | useEffect |
| `ReviewCard.jsx` | ஒரு review காட்டும் | Props |

---

## Week 7 preview
Every `setTimeout` simulation will be replaced by a real `fetch` call to the
Spring Boot backend, and `onAddMovie` will `POST` the new movie to the server.
#   M o v i e - R e v i e w - P r o j e c t  
 