module.exports = async (kernel) => {
  const PORT = await kernel.port()
  return {
    "daemon": true,
    "run": [{
      "method": "modal",
      "params": {
        "title": "Ollama",
        "description": "Launch Ollama before proceeding.",
        "menu": [{
          "text": "Install Ollama",
          "href": "https://ollama.com/"
        }]
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app/backend",
        "env": {
          PORT,
          HOST: "127.0.0.1"
        },
        "venv": "env",
        //"message": "{{platform === 'win32' ? 's.bat' : 'bash s.sh'}}",
        "message": "{{platform === 'win32' ? 'start_windows.bat' : 'bash start.sh'}}",
        "on": [{ "event": "/http://[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
}
