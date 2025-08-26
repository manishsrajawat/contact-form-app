# SSP Pro Dashboard 🚀

A modern, futuristic Supply-Side Platform (SSP) dashboard built for ad publishers. This dashboard provides a comprehensive interface for managing ad inventory, placements, and analytics with a beautiful glassmorphism design.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Property Support**: Website, Mobile App, CTV, and DOOH properties
- **Placement Management**: Create and manage ad placements with different formats
- **Creative Settings**: Control ad formats, sizes, and quality restrictions
- **Integration Code Generation**: Auto-generated JavaScript tags, SDK snippets, VAST URLs
- **Real-time Analytics**: Revenue tracking, fill rates, eCPM monitoring
- **DSP Performance**: Track top-performing demand-side platforms

### 🎨 Modern UI/UX
- **Futuristic Design**: Glassmorphism effects with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: CSS animations and transitions
- **Interactive Elements**: Hover effects, click animations, and micro-interactions
- **Dark Theme**: Professional dark theme with neon accents

### 🛠️ Technical Features
- **No Database Required**: Pure frontend implementation
- **Railway Ready**: Configured for instant deployment
- **No Validations**: Simple, straightforward forms
- **Multi-step Wizard**: Guided property creation process
- **Code Syntax Highlighting**: Professional code display for integration

## 📁 Project Structure

```
SSP/
├── index.html              # Main dashboard page
├── property-details.html   # Individual property management
├── css/
│   └── style.css          # Modern styling with glassmorphism
├── js/
│   └── main.js            # Interactive functionality
├── images/                # Static assets
├── package.json           # Railway deployment config
└── README.md              # This file
```

## 🚀 Getting Started

### Local Development
1. Clone or download the project
2. Navigate to the SSP directory
3. Run locally:
   ```bash
   npm run dev
   ```
   Or simply open `index.html` in your browser

### Railway Deployment
1. Push the code to a GitHub repository
2. Connect your Railway account to GitHub
3. Deploy directly from the repository
4. Railway will automatically detect and serve the static files

The `package.json` is pre-configured with the correct start script for Railway deployment.

## 🎮 How to Use

### Dashboard Overview
- View all your properties in card format
- Monitor key metrics: Revenue, Fill Rate, eCPM, Impressions
- Quick access to property details and settings

### Adding Properties
1. Click "Add Property" button
2. **Step 1**: Choose property type (Website/Mobile App/CTV/DOOH)
3. **Step 2**: Create placements with sizes and frequency caps
4. **Step 3**: Configure creative settings and blocked categories
5. **Step 4**: Copy integration code for your platform
6. **Step 5**: Review and activate your property

### Property Management
- Click "View Details" on any property card
- Monitor individual placement performance
- Track top-performing DSPs
- Manage placement settings

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple-blue gradient (#667eea to #764ba2)
- **Secondary**: Pink-red gradient (#f093fb to #f5576c)
- **Accent**: Neon blue (#00d4ff)
- **Success**: Neon green (#00ff88)
- **Warning**: Orange (#ff6b35)

### Glassmorphism Effects
- Transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Gradient overlays and animations
- Interactive hover states

## 🔧 Customization

### Modifying Property Types
Edit the `loadPlacementCreationStep()` function in `main.js` to add new property types or placement options.

### Updating Styles
Modify CSS variables in `style.css`:
```css
:root {
    --primary-gradient: your-gradient-here;
    --accent-blue: your-color-here;
    /* ... other variables */
}
```

### Adding New Pages
Create new HTML files and link them in the navigation sidebar.

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Desktop**: Full sidebar navigation
- **Tablet**: Responsive grid layouts
- **Mobile**: Collapsible sidebar, stacked cards

## ⌨️ Keyboard Shortcuts

- **ESC**: Close any open modal
- **Ctrl/Cmd + K**: Open "Add Property" modal

## 🔮 Integration Examples

The dashboard generates realistic integration code for different platforms:

### Website JavaScript
```javascript
window.sspConfig = {
  propertyId: 'prop_abc123',
  placements: {
    'homepage-banner': {
      id: 'placement-1',
      size: [728, 90],
      type: 'banner'
    }
  }
};
```

### Mobile SDK (iOS Swift)
```swift
import SSPProSDK
SSPPro.initialize(propertyId: "prop_abc123")
let bannerAd = SSPBannerAd(placementId: "placement-1")
```

### CTV VAST URLs
```
https://ad.ssppro.com/vast?property=prop_abc123&placement=placement-1
```

## 🎯 Perfect for Railway

This project is optimized for Railway deployment:
- ✅ No database required
- ✅ Static file serving
- ✅ Automatic port detection
- ✅ Zero configuration needed
- ✅ Instant deployment

## 🌟 Features Showcase

1. **Modern Dashboard**: Clean, professional interface
2. **Interactive Wizard**: Step-by-step property creation
3. **Real-time Metrics**: Live data visualization
4. **Code Generation**: Platform-specific integration
5. **Responsive Design**: Works on all devices
6. **Smooth Animations**: Professional interactions

## 📄 License

MIT License - Feel free to use this project for your own SSP dashboard needs!

---

**Built with ❤️ for the future of programmatic advertising**
