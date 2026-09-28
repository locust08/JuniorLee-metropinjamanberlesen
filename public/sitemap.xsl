<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Metro Pinjaman Berlesen Sitemap</title>
        <style>
          :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
          body { margin: 0; color: #17352f; background: #f4f8f6; }
          main { width: min(1120px, calc(100% - 32px)); margin: 48px auto; }
          h1 { margin: 0 0 8px; color: #0e6656; font-size: clamp(1.8rem, 4vw, 2.6rem); }
          p { margin: 0 0 24px; color: #526b65; }
          .table-wrap { overflow-x: auto; border: 1px solid #d7e4df; border-radius: 14px; background: #fff; box-shadow: 0 12px 30px rgba(14, 102, 86, .08); }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 14px 16px; border-bottom: 1px solid #e5eeeb; text-align: left; vertical-align: top; }
          th { color: #fff; background: #0e6656; font-size: .8rem; letter-spacing: .04em; text-transform: uppercase; }
          tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: #f4fbf8; }
          a { color: #0b725f; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .alternate { display: block; margin-bottom: 5px; white-space: nowrap; }
          .language { display: inline-block; min-width: 68px; color: #526b65; font-size: .8rem; font-weight: 700; }
          .priority { font-variant-numeric: tabular-nums; }
        </style>
      </head>
      <body>
        <main>
          <h1>XML Sitemap</h1>
          <p>
            This sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
            indexable URLs for Metro Pinjaman Berlesen.
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Language alternatives</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                    <td>
                      <xsl:for-each select="xhtml:link">
                        <span class="alternate">
                          <span class="language"><xsl:value-of select="@hreflang"/></span>
                          <a href="{@href}"><xsl:value-of select="@href"/></a>
                        </span>
                      </xsl:for-each>
                    </td>
                    <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
