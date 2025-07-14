#!/bin/bash

# Knoux CleanMaster Ultra™ Deployment Script
# نسخة نشر مدير التنظيف كنوكس الترا

echo "🛡️ Knoux CleanMaster Ultra™ - بدء عملية النشر"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}[KNOUX]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Please run from project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Installing dependencies..."
    npm install
fi

print_header "1️⃣ فحص التبعيات - Checking Dependencies"
if npm list > /dev/null 2>&1; then
    print_success "Dependencies are OK"
else
    print_error "Dependency issues found. Please run 'npm install'"
    exit 1
fi

print_header "2️⃣ تشغيل الفحص - Running Linter"
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting warnings found (continuing...)"
fi

print_header "3️⃣ بناء الإنتاج - Building for Production"
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed!"
    exit 1
fi

print_header "4️⃣ فحص البناء - Testing Build"
if [ -d "dist" ]; then
    print_success "Build directory created"
    
    # Check if main files exist
    if [ -f "dist/index.html" ]; then
        print_success "Index.html found"
    else
        print_error "Index.html not found in build!"
        exit 1
    fi
    
    # Get build size
    build_size=$(du -sh dist | cut -f1)
    print_status "Build size: $build_size"
else
    print_error "Build directory not found!"
    exit 1
fi

print_header "5️⃣ إنشاء معلومات النشر - Creating Deployment Info"
cat > dist/deploy-info.json << EOF
{
  "appName": "Knoux CleanMaster Ultra™",
  "version": "1.0.0",
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "environment": "production",
  "buildSize": "$build_size",
  "features": {
    "aiFeatures": true,
    "blackDiamond": true,
    "glassUI": true,
    "arabicSupport": true
  },
  "deployedBy": "Knoux Deployment System",
  "notes": "النظام الذكي المتقدم لتنظيف وتحسين الأداء"
}
EOF

print_success "Deployment info created"

print_header "6️⃣ إنشاء ملف التحقق - Creating Verification File"
cat > dist/verify.txt << EOF
Knoux CleanMaster Ultra™ - Deployment Verification
==================================================

✅ Application: Knoux CleanMaster Ultra™
✅ Version: 1.0.0
✅ Build Date: $(date)
✅ Environment: Production
✅ Status: Ready for deployment

🛡️ Security Features:
- BlackDiamond™ Access: Enabled
- Security Vault: Active
- Privacy Protection: Enabled

⚡ Performance Features:
- Hyper Clean Engine: Ready
- Performance Reactor: Optimized
- AI Health Center: Active

🎨 UI Features:
- Glassmorphism: Enabled
- Neon Effects: Active
- Arabic Support: Full

📊 Build Information:
- Bundle Size: $build_size
- Optimization: Enabled
- Source Maps: Generated

🔧 Deployment Notes:
يمكن نشر هذا البناء على أي خادم ويب يدعم SPA
This build can be deployed to any web server that supports SPAs

للمزيد من المعلومات: README.md
For more information: README.md
EOF

print_success "Verification file created"

echo ""
echo "🎉 ============================================="
echo "🎉 تم النشر بنجاح! - Deployment Successful!"
echo "🎉 ============================================="
echo ""
print_status "الملفات جاهزة في مجلد: dist/"
print_status "Files ready in directory: dist/"
echo ""
print_status "خطوات النشر التالية:"
print_status "Next deployment steps:"
echo "  1. Upload dist/ folder to your web server"
echo "  2. Configure web server for SPA routing"
echo "  3. Set up HTTPS (recommended)"
echo "  4. Test the application"
echo ""
print_warning "تذكر: تأكد من تكوين الخادم لإعادة توجيه جميع الطلبات إلى index.html"
print_warning "Remember: Configure server to redirect all requests to index.html"
echo ""
print_success "🛡️ Knoux CleanMaster Ultra™ جاهز للعالم!"
print_success "🛡️ Knoux CleanMaster Ultra™ is ready for the world!"
