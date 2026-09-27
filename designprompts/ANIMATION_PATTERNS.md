# Animation Patterns - Incredible India

Complete collection of 22+ animation patterns used throughout the Incredible India application. Each pattern is production-ready and can be copy-pasted directly into your components.

## 🎬 All Animation Patterns

### Pattern 1: Fade In
**Use Case**: Page transitions, component appearance, subtle entrance
**Duration**: 0.5s
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content fades in
</motion.div>
```

---

### Pattern 2: Slide In Left
**Use Case**: Sidebar, left-aligned panels, form inputs
**Duration**: 0.6s
```javascript
<motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Slides in from left
</motion.div>
```

---

### Pattern 3: Slide In Right
**Use Case**: Right-aligned notifications, side content, drawers
**Duration**: 0.6s
```javascript
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Slides in from right
</motion.div>
```

---

### Pattern 4: Slide In Top
**Use Case**: Dropdown menus, alerts, modals from top
**Duration**: 0.6s
```javascript
<motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Slides down from top
</motion.div>
```

---

### Pattern 5: Slide In Bottom
**Use Case**: Bottom sheets, floating action buttons, notifications
**Duration**: 0.6s
```javascript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Slides up from bottom
</motion.div>
```

---

### Pattern 6: Scale Up (Pop)
**Use Case**: Modal dialogs, pop-up forms, emphasis on new content
**Duration**: 0.5s
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Pops in with scale
</motion.div>
```

---

### Pattern 7: Bounce
**Use Case**: Loading indicators, attention getters, playful interactions
**Duration**: 1s, infinite
```javascript
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 1, repeat: Infinity }}
>
  Bounces up and down
</motion.div>
```

---

### Pattern 8: Rotate (Spinner)
**Use Case**: Loading spinners, refresh indicators, rotation effect
**Duration**: 2s, infinite
```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity, linear: true }}
>
  Spins continuously
</motion.div>
```

---

### Pattern 9: Hover Scale
**Use Case**: Buttons, cards, interactive elements, hover effect
**Duration**: 0.2s
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Hover to scale up
</motion.button>
```

---

### Pattern 10: Hover Lift (Elevation)
**Use Case**: Cards on hover, buttons with shadow, elevation effect
**Duration**: 0.2s
```javascript
<motion.div
  whileHover={{ y: -5, boxShadow: "0 20px 25px rgba(0,0,0,0.2)" }}
  transition={{ duration: 0.2 }}
>
  Lifts up on hover
</motion.div>
```

---

### Pattern 11: Stagger Children
**Use Case**: Lists, grids, items appearing one by one
**Duration**: Varies by child
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

### Pattern 12: Tab Content Switch
**Use Case**: Tab navigation, content switching between views
**Duration**: 0.3s
```javascript
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.3 }}
  >
    Tab content here
  </motion.div>
</AnimatePresence>
```

---

### Pattern 13: Accordion Expand
**Use Case**: Expandable sections, FAQs, collapsible content
**Duration**: 0.3s
```javascript
<motion.div
  animate={{ height: isOpen ? "auto" : 0 }}
  transition={{ duration: 0.3 }}
  overflow="hidden"
>
  Expandable content
</motion.div>
```

---

### Pattern 14: Pulse
**Use Case**: Highlights, attention effects, subtle pulse animation
**Duration**: 2s, infinite
```javascript
<motion.div
  animate={{ opacity: [1, 0.5, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Pulses with opacity change
</motion.div>
```

---

### Pattern 15: Shake (Error)
**Use Case**: Error states, validation failures, alerts
**Duration**: 0.5s
```javascript
<motion.div
  animate={{ x: [0, -5, 5, -5, 5, 0] }}
  transition={{ duration: 0.5 }}
>
  Shakes on error
</motion.div>
```

---

### Pattern 16: Gradient Shift
**Use Case**: Gradient backgrounds, visual effects, moving backgrounds
**Duration**: 3s, infinite
```javascript
<motion.div
  style={{
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
  }}
  animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
  transition={{ duration: 3, repeat: Infinity }}
>
  Gradient shifts
</motion.div>
```

---

### Pattern 17: Blur Entrance
**Use Case**: Dramatic page transitions, blur-in effects
**Duration**: 0.6s
```javascript
<motion.div
  initial={{ opacity: 0, filter: "blur(10px)" }}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.6 }}
>
  Blurs in dramatically
</motion.div>
```

---

### Pattern 18: Flip Card
**Use Case**: Card flips, reveal effects, 3D-like transforms
**Duration**: 0.6s
```javascript
<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.6 }}
  style={{ perspective: 1000 }}
>
  Flips 180 degrees
</motion.div>
```

---

### Pattern 19: Parallax Scroll
**Use Case**: Scrolling parallax effects, depth simulation
**Duration**: Real-time with scroll
```javascript
import { useScroll, useTransform } from "framer-motion";

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 300], [0, 100]);

<motion.div style={{ y }}>
  Moves with scroll parallax
</motion.div>
```

---

### Pattern 20: Spring Physics
**Use Case**: Natural motion, bouncy interactions, elastic feel
**Duration**: Varies by stiffness/damping
```javascript
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 100, damping: 10 }}
>
  Spring animation
</motion.div>
```

---

### Pattern 21: Exit Animation
**Use Case**: Page unmount, element removal, fade out
**Duration**: 0.3s
```javascript
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      Element fades and slides out
    </motion.div>
  )}
</AnimatePresence>
```

---

### Pattern 22: Modal Overlay
**Use Case**: Modal backgrounds, overlays, backdrop blur
**Duration**: 0.3s
```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="backdrop-blur-md bg-black/40"
  transition={{ duration: 0.3 }}
>
  Modal overlay with blur
</motion.div>
```

---

### Pattern 23: Sequence Animation
**Use Case**: Multiple animations in sequence, complex choreography
**Duration**: 2s total
```javascript
<motion.div
  animate={{ 
    y: [0, -20, 0],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 5, -5, 0]
  }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Multiple properties animate together
</motion.div>
```

---

### Pattern 24: Drag Animation
**Use Case**: Draggable elements, interactive components
**Duration**: Real-time while dragging
```javascript
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  dragElastic={0.2}
>
  Drag me around
</motion.div>
```

---

## 📋 Quick Reference Table

| Pattern | Duration | Infinite | Use Case |
|---------|----------|----------|----------|
| Fade In | 0.5s | No | Page transitions |
| Slide In Left | 0.6s | No | Sidebar entrance |
| Slide In Right | 0.6s | No | Notifications |
| Slide In Top | 0.6s | No | Dropdowns |
| Slide In Bottom | 0.6s | No | Bottom sheets |
| Scale Up | 0.5s | No | Modal pop |
| Bounce | 1s | Yes | Loading indicator |
| Rotate | 2s | Yes | Loading spinner |
| Hover Scale | 0.2s | No | Button hover |
| Hover Lift | 0.2s | No | Card hover |
| Stagger Children | Varies | No | List items |
| Tab Switch | 0.3s | No | Tab navigation |
| Accordion | 0.3s | No | Expandable content |
| Pulse | 2s | Yes | Highlight effect |
| Shake | 0.5s | No | Error state |
| Gradient Shift | 3s | Yes | Background effect |
| Blur Entrance | 0.6s | No | Dramatic entry |
| Flip Card | 0.6s | No | Card reveal |
| Parallax | Real-time | No | Scroll effect |
| Spring | Varies | No | Bouncy feel |
| Exit | 0.3s | No | Unmount animation |
| Modal Overlay | 0.3s | No | Modal backdrop |
| Sequence | 2s | Yes | Complex choreography |
| Drag | Real-time | No | Draggable element |

---

## 🎯 How to Use These Patterns

### Step 1: Choose Your Pattern
Look at the use case and find the matching pattern above.

### Step 2: Copy the Code
Copy the entire `<motion.div>` code block.

### Step 3: Import Framer Motion
```javascript
import { motion, AnimatePresence } from 'framer-motion';
```

### Step 4: Paste and Customize
Replace "Content here" with your actual content and adjust values as needed.

### Step 5: Test and Refine
- Adjust `duration` for timing (0.3s = fast, 0.6s = moderate, 1s = slow)
- Adjust `x`, `y` for distance
- Adjust `scale` for size changes
- Adjust `rotate` for rotation angles

---

## 💡 Pro Tips

### Combine Patterns
Mix multiple animations in one component:
```javascript
<motion.div
  initial={{ opacity: 0, x: -30, scale: 0.9 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  whileHover={{ scale: 1.05 }}
  exit={{ opacity: 0, x: -30 }}
  transition={{ duration: 0.6 }}
>
  Combined animations
</motion.div>
```

### Use Variants for Reusability
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Performance Optimization
- Use `will-change` CSS for frequently animated elements
- Avoid animating `width` and `height`, use `scale` instead
- Use `transform` and `opacity` for best performance
- Limit infinite animations to non-critical elements

---

## 🔗 Related Documentation

- See **DESIGN_SYSTEM.md** for colors and spacing to use with animations
- See **COMPONENT_LIBRARY.md** for components already using these patterns
- See **INSTALLATION_GUIDE.md** for setup instructions

---

**Last Updated**: 2026-09-27
**Total Patterns**: 24 animations ready to use
**Framework**: Framer Motion v10+
**React Version**: React 18+
