@echo off

NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
	echo Para instalação de dependências é nesscessário permissão de administrador. Por favor execute com administrador.
	pause
	exit
)

