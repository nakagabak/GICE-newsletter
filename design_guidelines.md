# Design Guidelines: GICE Email Template Builder

## Design Approach
**System-Based Approach**: Productivity tool with split-screen interface - Material Design principles for the builder UI, combined with email-safe, Harvard-branded styling for template previews.

## Core Design Elements

### A. Color Palette

**Builder Interface (Dark Mode)**
- Background: 220 15% 12%
- Surface: 220 15% 16%
- Border: 220 10% 25%
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Email Template (Light, Email-Safe)**
- Primary (Harvard Crimson): 350 75% 42%
- Background: 0 0% 100%
- Section Background: 0 0% 97%
- Text: 0 0% 15%
- Border: 0 0% 88%
- Link: 210 100% 45%

### B. Typography

**Builder Interface**
- Primary: Inter (modern, clean)
- Headings: 600-700 weight
- Body: 400-500 weight
- Code/Technical: 'JetBrains Mono'

**Email Templates**
- Headings: Georgia, serif (email-safe, professional)
- Body: Arial, Helvetica, sans-serif (maximum compatibility)
- Sizes: 24px (h1), 20px (h2), 16px (h3), 14px (body)

### C. Layout System

**Spacing**: Tailwind units of 2, 3, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-12
- Card gaps: gap-4 to gap-6

**Builder Layout**: Split-screen design
- Left sidebar (300px): Component library and tools
- Center canvas (fluid): Live email preview at 600px width (standard email width)
- Right panel (280px, collapsible): Properties editor

### D. Component Library

**Builder Components**
1. **Drag Sources Panel**
   - Content blocks organized by category
   - Visual thumbnails of each block type
   - Hover states with subtle lift effect

2. **Canvas Area**
   - 600px fixed-width preview container
   - Drop zones with dashed borders on hover
   - Reorder indicators between blocks

3. **Block Types for Email Templates**
   - Header: Logo, navigation, web version link
   - Hero Banner: Large title with optional image
   - Text Block: Rich text with formatting
   - Event Card: Image + title + date + description + CTA
   - Announcement Block: Icon + heading + text
   - Two-Column Layout: Side-by-side content
   - Divider: Horizontal rule with spacing
   - Footer: Contact, social links, unsubscribe

4. **Inline Editing**
   - Click-to-edit text fields
   - Floating toolbar for formatting
   - Image upload with preview

5. **Controls**
   - Reorder handles (drag icon)
   - Delete button (subtle, appears on hover)
   - Duplicate block option
   - Settings gear icon for advanced options

**Email Template Components**
- All components must use table-based layouts for email compatibility
- Maximum width: 600px
- Inline CSS only (no external stylesheets)
- Images: Hosted URLs, alt text required

### E. Animations
Use minimally and purposefully:
- Drag preview: Slight opacity reduction (0.6)
- Drop zone highlight: Gentle border pulse
- Block insertion: Smooth slide-in (200ms)
- NO animations in exported email HTML

## Email Template Design Patterns

### Header Section
- Harvard/HGSE logo (left-aligned, 120px width)
- Optional navigation links (right-aligned)
- "View in browser" link (small, gray text)
- Crimson top border (4px solid)

### Content Sections
- Generous whitespace: 40px vertical padding
- Alternating background colors for visual separation
- Event cards: Image (full-width or left-aligned), title, date, description, "Learn More" button
- Announcement blocks: Title bar with background color, body text with image optional

### Footer Section
- Dark background (matching header theme)
- Social media icons (monochrome, linked)
- Contact information
- Unsubscribe link (required, small text)
- Harvard affiliation statement

## Images

**Builder Interface**
- No large hero images
- Small icons for component library (32x32px)
- Thumbnail previews of block types

**Email Templates**
- Event images: 600x300px or 280x200px (sidebar)
- Logo: 120x60px max
- Icon graphics: 48x48px
- All images must have alt text and hosted URLs

## Builder-Specific Features

**Top Toolbar**
- Template name (editable inline)
- Save/Export buttons (crimson primary button)
- Preview toggle (desktop/mobile)
- Undo/Redo (keyboard shortcuts supported)

**Properties Panel**
- Grouped settings by category
- Color pickers with Harvard palette presets
- Font size sliders
- Spacing controls
- Link management

**Responsive Preview**
- Desktop (600px): Default view
- Mobile (320px): Stacked layout preview
- Toggle between views seamlessly

## Export Functionality
- Generate standalone HTML file
- Inline all CSS
- Table-based layout
- Email client testing checklist
- Copy-to-clipboard option