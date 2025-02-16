import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function POST(req: Request) {
  try {
    let browser = null;
    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch();
    }
    if (process.env.NODE_ENV === "production") {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
      });
    }
    if (!browser) {
      throw new Error("Browser instance is null");
    }
    const page = await browser.newPage();
    const body = await req.json();

    const { name, dob, imageUrl } = body;

    const template1 = `
      <div style="
    width: 794px; 
    height: 1123px;  
    margin: 0 auto;
    background-image: url('${
      process.env.NEXT_PUBLIC_BASE_URL
    }/transparent-template.png');
    background-size: contain; 
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Cursive', serif;
">
    <h1 style="color: darkred; font-size: 28px; margin-bottom: 10px;">Bio Data</h1>
    <img src="${imageUrl}" alt="Profile" style="width: 120px; height: 120px; border-radius: 50%; border: 5px solid darkred;">
    <p style="font-size: 18px; background: rgba(255, 255, 255, 0.7); padding: 5px;">
      <strong>Name:</strong> ${name || "Full Name"}
    </p>
    <p style="font-size: 18px; background: rgba(255, 255, 255, 0.7); padding: 5px;">
      <strong>Date of Birth:</strong> ${dob || "YYYY-MM-DD"}
    </p>
</div>
    `;

    await page.setContent(template1);
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=biodata.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
