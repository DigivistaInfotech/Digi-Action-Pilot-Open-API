$ErrorActionPreference = "Stop"
$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $appRoot ".env"

if (-not (Test-Path -LiteralPath $envFile)) {
    Write-Host "ActionPilot first-time setup" -ForegroundColor Cyan
    $allowedFolder = Read-Host "Full path of the ONE folder ActionPilot may access"
    if (-not (Test-Path -LiteralPath $allowedFolder -PathType Container)) {
        throw "That folder does not exist. Create it first, then run this setup again."
    }
    $resolvedFolder = (Resolve-Path -LiteralPath $allowedFolder).Path
    $apiKey = Read-Host "OpenAI API key"
    if ([string]::IsNullOrWhiteSpace($apiKey)) { throw "An API key is required." }
    $escapedFolder = $resolvedFolder -replace '\\', '\\'
    @(
        "OPENAI_API_KEY=$apiKey"
        "OPENAI_MODEL=gpt-5.4-mini"
        "ACTIONPILOT_PORT=4310"
        "ACTIONPILOT_WORKSPACE=$escapedFolder"
    ) | Set-Content -LiteralPath $envFile -Encoding utf8
    Write-Host "Saved. This folder is now the access boundary:" -ForegroundColor Green
    Write-Host $resolvedFolder
}

Set-Location -LiteralPath $appRoot
node server.mjs
