# TODO - Fix ThreatGlobe Issues - COMPLETED

## Task:
Fix the Three.js globe that is:
1. Not rotating while scrolling and dragging
2. Not displaying tooltip on hover in Threat News section

## Fixes Implemented:

### 1. Fix scroll rotation (wheel event)
- ✅ Changed `{ passive: true }` to `{ passive: false }` for wheel event
- ✅ Added `e.preventDefault()` to properly handle scroll rotation

### 2. Fix drag rotation
- ✅ Initialized mouse position on component mount (via setTimeout)
- ✅ Event listeners properly attached from start

### 3. Fix hover tooltip display
- ✅ Initialize mouse position at center of container on mount
- ✅ Ensure raycasting works correctly from initial state

## Status: COMPLETED ✅

## Build Status: SUCCESS ✅
- Build output created in dist/ folder
- Project compiles without errors

## Notes:
The fixes ensure:
1. Globe rotates when scrolling (mouse wheel)
2. Globe rotates when dragging (click and move)
3. Tooltip displays correctly when hovering over threat markers
