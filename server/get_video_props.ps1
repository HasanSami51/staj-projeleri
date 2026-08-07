$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace('C:\Users\ebrar\Desktop\Staj\Website\public\images')
$file = $folder.ParseName('video.mp4')
0..320 | ForEach-Object {
    $n = $folder.GetDetailsOf($null, $_)
    $v = $folder.GetDetailsOf($file, $_)
    if ($v -and ($n -like '*Frame*' -or $n -like '*Width*' -or $n -like '*Height*' -or $n -like '*Kare*' -or $n -like '*Genişlik*' -or $n -like '*Yükseklik*' -or $n -like '*Boyut*')) {
        Write-Host "$_ - ${n}: ${v}"
    }
}
