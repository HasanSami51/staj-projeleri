Add-Type -AssemblyName PresentationCore
$player1 = New-Object System.Windows.Media.MediaPlayer
$player1.Open([System.Uri]'C:\Users\ebrar\Desktop\Staj\Website\public\images\video.mp4')

$player2 = New-Object System.Windows.Media.MediaPlayer
$player2.Open([System.Uri]'C:\Users\ebrar\Desktop\Staj\Website\public\images\bg-video.mp4')

Start-Sleep -Seconds 2

Write-Host "--- VIDEO.MP4 ---"
Write-Host "Genişlik (Width): $($player1.NaturalVideoWidth)"
Write-Host "Yükseklik (Height): $($player1.NaturalVideoHeight)"

Write-Host "--- BG-VIDEO.MP4 ---"
Write-Host "Genişlik (Width): $($player2.NaturalVideoWidth)"
Write-Host "Yükseklik (Height): $($player2.NaturalVideoHeight)"
