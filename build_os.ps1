$base = "c:\Users\tsuba\AppTalentHub"
Set-Location $base

# 1. Define folder list
$folders = @(
    "00_core/system_prompt",
    "01_management/01_legal",
    "01_management/02_accounting",
    "01_management/03_hr",
    "02_product/00_prototypes",
    "02_product/01_projects",
    "02_product/02_infra",
    "03_contents/01_stock",
    "03_contents/02_published",
    "03_contents/03_assets",
    "04_sales_marketing/00_prototypes",
    "04_sales_marketing/01_crm",
    "04_sales_marketing/02_proposals",
    "05_operations/01_meetings",
    "05_operations/02_it_assets"
)

# 2. Create folders and .gitkeep
foreach ($f in $folders) {
    if (-not (Test-Path $f)) {
        New-Item -ItemType Directory -Path $f -Force
    }
    New-Item -ItemType File -Path "$f/.gitkeep" -Force
}

# 3. Migrate Projects (01_products -> 02_product/01_projects)
if (Test-Path "01_products/gitbiz") { Move-Item "01_products/gitbiz" "02_product/01_projects/gitbiz" }
if (Test-Path "01_products/MarkShot") { Move-Item "01_products/MarkShot" "02_product/01_projects/markshot" }

# 02_internal_tools -> 02_product/01_projects
if (Test-Path "02_internal_tools/Axon-Agent") { Move-Item "02_internal_tools/Axon-Agent" "02_product/01_projects/axon_agent" }
if (Test-Path "02_internal_tools/TodayGoogleCalendar") { Move-Item "02_internal_tools/TodayGoogleCalendar" "02_product/01_projects/today_google_calendar" }

# 4. Migrate Prototypes (03_prototypes -> 02_product/00_prototypes)
$proto_map = @{
    "Beattiful-camera"   = "beautiful_camera"
    "Claude-grant-pilot" = "claude_grant_pilot"
    "Cursor-CONDEX"      = "cursor_condex"
    "Cursor-park-test"   = "cursor_park_test"
    "appnavi"            = "appnavi"
    "art-voice"          = "art_voice"
    "famipack"           = "famipack"
}

foreach ($old in $proto_map.Keys) {
    $src = "03_prototypes/$old"
    $dest = "02_product/00_prototypes/$($proto_map[$old])"
    if (Test-Path $src) {
        Move-Item $src $dest
    }
}

# 5. Migrate Marketing (04_marketing -> 03_contents)
if (Test-Path "04_marketing/lp") { Move-Item "04_marketing/lp" "03_contents/02_published/lp" }
if (Test-Path "04_marketing/assets") { Move-Item "04_marketing/assets" "03_contents/03_assets/marketing" }
if (Test-Path "04_marketing/comics") { Move-Item "04_marketing/comics" "03_contents/01_stock/comics" }
if (Test-Path "04_marketing/stock") { Move-Item "04_marketing/stock" "03_contents/01_stock/marketing" }
if (Test-Path "04_marketing/published") { Move-Item "04_marketing/published" "03_contents/02_published/general" }

# 6. Cleanup old root-level organization folders
Remove-Item "01_products" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "02_internal_tools" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "03_prototypes" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "04_marketing" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "CORE_IDENTITY.md" -Force -ErrorAction SilentlyContinue
