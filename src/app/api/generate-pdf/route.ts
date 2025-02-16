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

    const {
      name,
      dob,
      timeOfBirth,
      placeOfBirth,
      rashi,
      nakshatra,
      complexion,
      height,
      education,
      religionCaste,
      jobOccupation,
      income,
      gothram,
      imageUrl,
    } = body;

    const fields = [
      { label: "Name", value: name },
      { label: "Date of Birth", value: dob },
      { label: "Time of Birth", value: timeOfBirth },
      { label: "Place of Birth", value: placeOfBirth },
      { label: "Rashi", value: rashi },
      { label: "Nakshatra", value: nakshatra },
      { label: "Complexion", value: complexion },
      { label: "Height", value: height },
      { label: "Education", value: education },
      { label: "Religion/Caste", value: religionCaste },
      { label: "Job/Occupation", value: jobOccupation },
      { label: "Income", value: income },
      { label: "Gothram", value: gothram },
    ]
      .filter((field) => field.value) // Exclude empty fields
      .map((field) => `<p><strong>${field.label}:</strong> ${field.value}</p>`)
      .join("");

    const template = `
      <div style="width: 794px; height: 1123px; margin: 0 auto;
        background-image: url('${process.env.NEXT_PUBLIC_BASE_URL}/transparent-template.png');
        background-size: contain; background-position: center;
        background-repeat: no-repeat; overflow: hidden;
        display: flex; flex-direction: column; align-items: center; font-family: 'Cursive', serif;">
        
        <h1 style="color: darkred; font-size: 28px; margin-top: 120px; margin-bottom: 10px;">Bio Data</h1>
        <img src="${imageUrl}" alt="Profile" style="width: 120px; height: 120px;
          border-radius: 50%; border: 5px solid darkred;">
        
        <div style="font-size: 18px; padding: 10px; width: 70%;">
          ${fields}
        </div>
      </div>
    `;

    await page.setContent(template);
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
