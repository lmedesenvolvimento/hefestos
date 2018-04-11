from sys import platform
import pdfkit


# Configurando wkhtmltopdf
if platform == "linux" or platform == "linux2":
  # linux
  config = pdfkit.configuration(wkhtmltopdf='./linux/wkhtmltopdf')
elif platform == "win32":
  #Windows
  config = pdfkit.configuration(wkhtmltopdf='./windows/wkhtmltox-0.12.4_mingw-w64-cross-win64.exe')

body = """
    <html>
      <head>
        <meta name="pdfkit-page-size" content="Legal"/>
        <meta name="pdfkit-orientation" content="Landscape"/>
      </head>
      Hello World!
      </html>
    """

pdfkit.from_string(body, 'out.pdf', configuration=config) #with --page-size=Legal and --orientation=Landscape