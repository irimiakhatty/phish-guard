# Fix all versioned imports in UI components
$files = Get-ChildItem -Path "E:\code\PhishGuard\src\components\ui" -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '@radix-ui/([a-z-]+)@[\d\.]+', '@radix-ui/$1'
    $content = $content -replace 'class-variance-authority@[\d\.]+', 'class-variance-authority'
    $content = $content -replace 'tailwind-merge@[\d\.]+', 'tailwind-merge'
    $content = $content -replace 'lucide-react@[\d\.]+', 'lucide-react'
    $content = $content -replace 'react-hook-form@[\d\.]+', 'react-hook-form'
    $content = $content -replace 'date-fns@[\d\.]+', 'date-fns'
    $content = $content -replace 'embla-carousel-react@[\d\.]+', 'embla-carousel-react'
    $content = $content -replace 'recharts@[\d\.]+', 'recharts'
    $content = $content -replace 'input-otp@[\d\.]+', 'input-otp'
    $content = $content -replace 'cmdk@[\d\.]+', 'cmdk'
    $content = $content -replace 'vaul@[\d\.]+', 'vaul'
    $content = $content -replace 'react-day-picker@[\d\.]+', 'react-day-picker'
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Fixed all versioned imports in UI components!"
