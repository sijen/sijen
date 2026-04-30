# Implementation Plan: ThreatGlobe Hover with Cybersecurity News

## Information Gathered:
- **ThreatGlobe.tsx**: Three.js globe component with 8 threat location markers (red spheres)
- **securityNews.ts**: Contains ThreatLocation[] with news items from cybersecuritynews.com
- Currently NO hover detection - markers are purely visual
- Locations match between both files: NYC, London, Tokyo, Paris, Sydney, Moscow, Shanghai, Rio

## Plan:
### Step 1: Add Raycaster for Hover Detection
- Import THREE.Raycaster and THREE.Vector2
- Add mouse move event listener for raycasting
- Track mouse position in state

### Step 2: Integrate Security News Data
- Import securityNewsData from src/data/securityNews.ts
- Map each marker to its corresponding news data by label

### Step 3: Add Hover State
- Add state: `hoveredLocation: ThreatLocation | null`
- Add state: `mousePosition: { x: number, y: number }`

### Step 4: Create Tooltip Component
- Show on hover with cybersecuritynews.com source
- Display location info + news list
- Position tooltip near cursor
- Use glassmorphism styling matching existing UI

### Step 5: Visual Feedback
- Scale up marker on hover
- Add glow effect
- Change cursor to pointer

## Files to Edit:
- src/components/ui/ThreatGlobe.tsx

## Dependencies Already Available:
- THREE.js (already imported)
- securityNews.ts (already has data)
