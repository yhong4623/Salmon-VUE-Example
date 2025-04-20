fx_version 'cerulean'
game 'gta5'

author 'Vue Example'
description 'Salmon'
version '1.0.0'

ui_page 'dist/index.html'  -- 直接指向打包後的HTML

files {
    'dist/**/*'  -- 包含打包後的所有文件
}

client_scripts {
    'client.lua'
}