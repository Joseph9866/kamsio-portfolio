# Design Document

## Overview

This design enhances the existing React + TypeScript portfolio application with improved UI/UX features. The solution focuses on five key areas: condensing the professional description, implementing profile image upload with local storage, enriching the projects section with media support, removing category filters, and adding an animated background to the hero section.

## Architecture

### Component Structure

The application maintains its single-component architecture (`App.tsx`) with the following enhancements:

- **Hero Section**: Enhanced with animated background and image upload functionality
- **Professional Description**: Refactored to three-line format
- **Projects Section**: Simplified to remove categories, enhanced with media and descriptions
- **State Management**: Extended to handle uploaded profile image and project media

### Technology Stack

- **React 18.3.1**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling and animations
- **LocalStorage API**: Profile image persistence
- **FileReader API**: Image upload handling
- **CSS Animations**: Background motion effects

## Components and Interfaces

### Profile Image Upload

**Implementation Approach:**
- Use HTML file input (hidden) triggered by clicking the profile circle
- FileReader API to convert uploaded image to base64 data URL
- Store base64 string in localStorage for persistence
- Display uploaded image or fallback to emoji placeholder

**Interface:**
```typescript
interface ProfileImageState {
  imageUrl: string | null;
}
```

**User Flow:**
1. User clicks on profile circle
2. File input dialog opens
3. User selects image file
4. Image is read and converted to base64
5. Image is stored in localStorage
6. Component re-renders with new image

### Professional Description

**Implementation:**
- Restructure text content to exactly three lines
- Use responsive typography to maintain three-line constraint
- Suggested content structure:
  - Line 1: Primary identity/role
  - Line 2: Key expertise or passion
  - Line 3: Value proposition or goal

### Projects Section Redesign

**Data Model:**
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
}
```

**Implementation Changes:**
- Remove category field from project objects
- Remove category filter buttons and state
- Add description field to each project
- Add media type detection
- Implement conditional rendering for images vs videos
- Maintain carousel functionality without category filtering

**Media Handling:**
- Images: Use `<img>` tag with object-fit for consistent sizing
- Videos: Use `<video>` tag with controls, muted autoplay on hover
- Support both URLs and uploaded files

### Animated Background

**Implementation Options:**

**Option 1: CSS Gradient Animation (Recommended)**
- Use CSS keyframe animations with gradient backgrounds
- Lightweight and performant
- No external dependencies
- Respects prefers-reduced-motion

**Option 2: Particle Effect**
- Canvas-based particle system
- More visually dynamic
- Higher performance cost

**Recommended Approach: CSS Gradient Animation**

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Features:**
- Smooth color transitions
- Configurable animation speed
- Subtle enough to not distract from content
- Accessible with motion preference detection

## Data Models

### LocalStorage Schema

```typescript
// Key: 'portfolio_profile_image'
{
  imageData: string; // base64 encoded image
  timestamp: number; // upload timestamp
}

// Key: 'portfolio_projects'
{
  projects: Project[]; // array of project objects
}
```

### Project Data Structure

```typescript
interface Project {
  id: number;
  title: string;
  description: string; // Brief description (50-150 characters)
  mediaUrl: string; // URL or base64 data
  mediaType: 'image' | 'video';
  thumbnailUrl?: string; // Optional thumbnail for videos
}
```

## Error Handling

### Image Upload Errors

1. **Invalid File Type**
   - Validate file type before processing
   - Show user-friendly error message
   - Accepted types: image/jpeg, image/png, image/webp, image/gif

2. **File Size Limit**
   - Limit to 5MB to prevent localStorage issues
   - Show error if file exceeds limit
   - Suggest image compression

3. **Storage Quota Exceeded**
   - Catch localStorage quota errors
   - Provide fallback to session-only storage
   - Inform user of limitation

### Media Loading Errors

1. **Failed to Load Image/Video**
   - Display placeholder with error icon
   - Provide retry mechanism
   - Log error for debugging

2. **Unsupported Media Format**
   - Validate media type
   - Show appropriate error message
   - Suggest supported formats

## Testing Strategy

### Unit Testing Focus

1. **Image Upload Logic**
   - Test file validation
   - Test base64 conversion
   - Test localStorage operations
   - Test error scenarios

2. **Project Data Handling**
   - Test project rendering with images
   - Test project rendering with videos
   - Test carousel navigation without categories

### Integration Testing

1. **User Workflows**
   - Upload profile image and verify persistence
   - Navigate through projects
   - Verify animated background renders correctly

### Visual Testing

1. **Responsive Design**
   - Test three-line description on mobile, tablet, desktop
   - Test profile image circle on different screen sizes
   - Test project grid responsiveness

2. **Animation Performance**
   - Verify smooth animation on various devices
   - Test with reduced motion preferences
   - Check for layout shifts

### Accessibility Testing

1. **Keyboard Navigation**
   - Ensure file input is keyboard accessible
   - Test focus states on interactive elements

2. **Screen Reader Compatibility**
   - Add appropriate ARIA labels for image upload
   - Ensure video controls are accessible

3. **Motion Preferences**
   - Respect prefers-reduced-motion setting
   - Provide static alternative for animated background

## Implementation Notes

### Performance Considerations

1. **Image Optimization**
   - Consider client-side image compression before storage
   - Use appropriate image formats (WebP preferred)
   - Lazy load project images

2. **Animation Performance**
   - Use CSS transforms and opacity for animations
   - Avoid animating layout properties
   - Use will-change sparingly

3. **LocalStorage Management**
   - Implement storage size monitoring
   - Provide clear mechanism if storage is full
   - Consider IndexedDB for larger media files in future

### Browser Compatibility

- Target modern browsers (Chrome, Firefox, Safari, Edge)
- FileReader API: Widely supported
- LocalStorage: Universal support
- CSS animations: Universal support with prefixes

### Future Enhancements

- Cloud storage integration for media files
- Image editing capabilities (crop, rotate)
- Project reordering via drag-and-drop
- Multiple image galleries per project
- Video thumbnail generation
