# Rick2909 Portfolio Website

A modern Vue.js portfolio website showcasing C# and Unity projects, optimized for GitHub Pages deployment.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Vue.js Framework**: Component-based architecture for maintainability
- **Easy Project Management**: Simple JSON-based project addition system
- **GitHub Pages Ready**: Automated deployment with GitHub Actions
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3, Vite
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Deployment**: GitHub Pages with GitHub Actions

## 📁 Project Structure

```
rick2909.github.io/
├── src/
│   ├── components/
│   │   └── ProjectCard.vue
│   ├── data/
│   │   └── projects.json
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── docs/
│   └── plan.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rick2909/rick2909.github.io.git
cd rick2909.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📝 Adding New Projects

To add new projects to your portfolio, simply edit the `src/data/projects.json` file:

### For C# Projects:
```json
{
  "id": 7,
  "title": "Your Project Name",
  "description": "Brief description of your project",
  "technologies": ["C#", ".NET", "Other Tech"],
  "github": "https://github.com/rick2909/your-repo",
  "demo": "https://your-demo-url.com",
  "download": "https://your-download-link.com"
}
```

### For Unity Projects:
```json
{
  "id": 8,
  "title": "Your Game Name",
  "description": "Brief description of your game",
  "technologies": ["Unity", "C#", "2D/3D"],
  "github": "https://github.com/rick2909/your-game-repo",
  "demo": "https://your-game.itch.io/game-name",
  "download": "https://play.google.com/store/apps/details?id=com.yourapp"
}
```

### Project Properties:
- **id**: Unique identifier (increment from existing projects)
- **title**: Project name
- **description**: Brief project description
- **technologies**: Array of technologies used
- **github**: GitHub repository URL (set to `null` if private)
- **demo**: Live demo URL (set to `null` if not available)
- **download**: Download/store link (set to `null` if not available)

## 🚀 Deployment

The website automatically deploys to GitHub Pages when you push to the main branch, thanks to the GitHub Actions workflow.

### Manual Deployment:
```bash
npm run build
npm run deploy
```

## 🎨 Customization

### Updating Personal Information:
1. Edit `src/App.vue` to update your name, bio, and contact information
2. Update social media links in the footer section
3. Modify the skills section to reflect your expertise

### Styling Changes:
- Main styles are in `src/style.css`
- Component-specific styles are in individual `.vue` files
- Color scheme can be easily modified by updating CSS custom properties

### Adding New Sections:
1. Add new section to `src/App.vue`
2. Create corresponding component in `src/components/`
3. Update navigation menu

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Vue.js and deployed on GitHub Pages**
