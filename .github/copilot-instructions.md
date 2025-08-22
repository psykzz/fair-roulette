# Fair Meeting Roulette - GitHub Copilot Instructions

**ALWAYS reference these instructions first and only fallback to search or bash commands when you encounter unexpected information that does not match the information provided here.**

## Overview
Fair Meeting Roulette is a React/TypeScript web application built with Vite that implements a fair meeting facilitator selection system. The application uses a weighted random selection algorithm that adjusts probabilities over time to ensure everyone gets chosen fairly. It stores team data in localStorage and features a modern UI built with Tailwind CSS.

## Development Setup & Build Process

### Prerequisites
- Node.js (any modern version - the project uses standard npm packages)

### Installation and Build Commands
Run these commands in order to set up your development environment:

```bash
npm install
```
- **Duration**: ~8 seconds
- **Purpose**: Installs all dependencies
- **NEVER CANCEL**: Always let this complete

```bash
npm run build
```
- **Duration**: ~1 second (very fast with Vite)
- **Purpose**: Creates production build in `dist/` directory
- **Output**: Optimized bundle for deployment

### Development Server
```bash
npm run dev
```
- **Duration**: Starts in ~0.2 seconds
- **URL**: http://localhost:5173/
- **Purpose**: Development server with hot module replacement
- **NEVER CANCEL**: Keep running during development

### Production Preview
```bash
npm run preview
```
- **Duration**: Starts in ~0.5 seconds  
- **URL**: http://localhost:4173/
- **Purpose**: Preview production build locally
- **Requirement**: Must run `npm run build` first

## Validation & Testing

### Manual Functionality Testing
ALWAYS test these core scenarios after making changes:

1. **Spin the roulette wheel**: Click "Spin the Wheel!" button and verify:
   - Animation shows team member names cycling
   - After 2 seconds, displays "The chosen one is... [Name]!"
   - Selected member's percentage decreases significantly (becomes ~2-3%)
   - Other members' percentages increase proportionally

2. **Add team members**: 
   - Type a name in the "Add new team member" field
   - Click "Add" button
   - Verify member appears in list with appropriate percentage
   - Verify percentages are recalculated correctly

3. **Remove team members**:
   - Click trash icon next to any team member
   - Verify member is removed
   - Verify percentages are recalculated for remaining members

4. **Persistence testing**:
   - Make changes to team members
   - Refresh the page
   - Verify changes persist (stored in localStorage)

### Application Structure Validation
Always verify the application loads with these elements:
- Header: "Fair Meeting Roulette" title and description
- Main selection area with roulette button
- Team management section with add/remove functionality  
- Team member list showing names and selection percentages
- Footer: "Built for fairness and fun"

## Code Architecture

### Key Components
- **App.tsx**: Main application component containing roulette logic
- **components/TeamManagement.tsx**: Team member add/remove UI
- **hooks/useTeam.ts**: Custom hook managing team state and fairness algorithm
- **types.ts**: TypeScript interfaces (TeamMember)
- **constants.ts**: Configuration values for weights and initial team

### Important Files to Check After Changes
- Always review `constants.ts` when modifying fairness algorithm weights
- Always check `hooks/useTeam.ts` when changing team management logic
- Always validate `types.ts` when adding new data structures

### Fairness Algorithm
The application implements weighted selection where:
- New members start with weight 10 (BASE_WEIGHT)
- Selected members get weight 1 (SELECTED_WEIGHT) 
- Non-selected members get +1 weight (INCREMENT_WEIGHT)
- Selection probability = member_weight / total_weight

## Technology Stack

### Core Dependencies
- **React 19.1.1**: UI framework with modern hooks
- **TypeScript 5.8.2**: Type safety and developer experience
- **Vite 6.2.0**: Build tool and development server
- **Tailwind CSS**: Styling via CDN (loaded in index.html)

### Build Configuration
- **vite.config.ts**: Vite configuration with path aliases
- **tsconfig.json**: TypeScript compiler options
- **index.html**: Entry point with Tailwind CDN and React imports via importmap

## Common Issues & Solutions

### Tailwind CSS Loading
- Tailwind is loaded via CDN in index.html
- If styles appear broken, check browser console for CDN loading errors
- Fallback: Styles may not load in restricted network environments

### TypeScript Compilation
- Run `npx tsc --noEmit` to check for type errors without building
- Most common issues: Missing imports or incorrect type annotations

### State Persistence
- Team data is stored in localStorage with key 'fairMeetingRouletteTeam'
- Clear localStorage if testing with fresh state is needed
- Check browser Developer Tools > Application > Local Storage for debugging

## Development Workflow

### Making Changes
1. Start development server: `npm run dev`
2. Make code changes
3. Test manually in browser (use validation scenarios above)
4. Build for production: `npm run build`
5. Test production build: `npm run preview`

### Code Style
- Use existing naming conventions (camelCase for variables, PascalCase for components)
- Follow React functional component patterns with hooks
- Maintain TypeScript strict typing
- Use Tailwind utility classes for styling

### No Automated Testing
**IMPORTANT**: This project has no automated test suite. All validation must be done manually using the scenarios described above. Do not attempt to add testing frameworks unless specifically requested.

### No Linting Configuration
**IMPORTANT**: This project has no ESLint or Prettier configuration. Follow existing code formatting patterns when making changes.

## Performance Notes
- Build times are very fast (~1 second) due to Vite optimization
- Hot module replacement works instantly during development
- Bundle size is optimized (~193KB gzipped) for the functionality provided

## Deployment Notes
- Build output goes to `dist/` directory
- Application is a static SPA - can be deployed to any static hosting service
- No server-side dependencies or API requirements
- No environment variables required for basic functionality
