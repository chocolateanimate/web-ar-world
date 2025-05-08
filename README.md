# 🌐 Web AR World

Welcome to **Web AR World** — a browser-based Augmented Reality (AR) experience where artwork and ideas come to life! This is a lifestyle tech and creative platform to showcase AR-enabled visuals and games via any phone browser, with an eye toward scalability and beauty from Day 1.

This guide helps you (or anyone new to coding) get started with the project from scratch.

---

## 🛠️ Initial Setup & Git Commands (Step-by-Step)

### 1. 📥 Clone the Repository
Download the project code to your local machine.
```bash
git clone https://github.com/chocolateanimate/web-ar-world.git
```

### 2. 📁 Navigate Into the Project Directory
Change your current terminal location to the project folder.
```bash
cd web-ar-world
```

### 3. 🧾 Create Basic Frontend Files
Set up the core files you'll need for the frontend interface.
```bash
mkdir public                   # Folder to store assets like images, models, videos
touch index.html styles.css scripts.js   # Create empty starter files
```

### 4. ✅ Stage and Commit Initial Files
Tell Git you want to include these files in version control and save your progress.
```bash
git add .                                      # Stage all current files
git commit -m "Initial commit: boilerplate setup"  # Save with a message
```

### 5. 🚀 Push to GitHub Main Branch
Send your local work to the remote GitHub repo on the `main` branch.
```bash
git push origin main
```

### 6. 🌿 Create a Feature Branch for AR Camera
Best practice is to create separate branches for different features.
```bash
git checkout -b feature/ar-camera    # Create and switch to new branch
```

### 7. 🔧 Make Some Changes & Save Progress
Once you've edited or added files, follow this cycle:
```bash
git add .                                      # Stage your new changes
git commit -m "Added AR camera basic UI"      # Describe what you did
git push origin feature/ar-camera             # Push your work to GitHub
```

### 8. 🧠 View Branches and Commit History
Helpful for tracking what’s going on.
```bash
git branch                      # List all local branches
git log --oneline -n 5         # Show the last 5 commit messages
```

### 9. 📝 Add README & Commit It Too
Anytime you update documentation, follow the same commit cycle:
```bash
git add README.md
git commit -m "Updated README with setup instructions"
git push origin feature/ar-camera
```

### 10. 🧰 BONUS: Show All Git Commands You've Used (Windows Only)
Great for reviewing your work or making documentation.
```bash
doskey /history
```

---

## 💡 Additional Tips

- 💡 `git add .` stages all changes; you can also use `git add filename` for specific files.
- ✅ You **can push to a feature branch** and later merge it into `main` using `git merge`.
- 🧑‍💻 You **don’t need another person** to approve a PR if you’re the only collaborator.
- 🌐 Consider deploying your site with **Netlify** or **Vercel** for free.
- 📦 Assets like videos or models can be stored using **Firebase** (free tier) or another cloud provider.

---

Stay tuned for the next README update with Firebase setup and AR camera integration.

Made with ❤️ by ChocolateAnimate
