-- 註冊NUI回調
RegisterNUICallback('callback', function(data, cb)
    cb({ message = 'Got your message: ' .. data.data })
end)

-- 顯示NUI
RegisterCommand('showui', function()
    SetNuiFocus(true, true)
    SendNUIMessage({ type = 'response', data = 'UI Opened' })
end, false)

-- 隱藏NUI
RegisterCommand('hideui', function()
    SetNuiFocus(false, false)
end, false)