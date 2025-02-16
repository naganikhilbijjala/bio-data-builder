import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const body = await req.json();

    const { name, dob, imageUrl } = body;

    await page.setContent(`
             <div style="font-family: Arial, sans-serif; padding: 20px; display: flex; align-items: center;">
        <div style="flex: 1;">
          <h1 style="color: #333;">Bio Data</h1>
          <p><strong>Full Name:</strong> ${name || "Full Name"}</p>
          <p><strong>Date of Birth:</strong> ${dob || "YYYY-MM-DD"}</p>
        </div>
        <div style="margin-left: 20px;">
          <img src="${imageUrl}" alt="Profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" />
        </div>
      </div>
          `);
    const pdfBuffer = await page.pdf({ format: "A4" });

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
