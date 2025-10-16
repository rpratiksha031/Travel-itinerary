export const generatePDF = (data) => {
  const {
    tripDetails,
    days,
    flights,
    hotels,
    activities,
    payment,
    inclusions,
    exclusions,
    importantNotes,
    scopeOfService,
  } = data;

  // Create a hidden div with the PDF content
  const pdfContent = document.createElement("div");
  pdfContent.style.position = "absolute";
  pdfContent.style.left = "-9999px";
  pdfContent.style.width = "210mm";
  pdfContent.style.background = "white";
  pdfContent.style.fontFamily = "Arial, sans-serif";

  pdfContent.innerHTML = `
    <div style="padding: 20px;">
      <!-- Header with Gradient -->
      <div style="background: linear-gradient(to right, #3b82f6, #a855f7, #9333ea); padding: 40px 30px; border-radius: 15px; color: white; margin-bottom: 20px;">
        <div style="display: flex; gap: 15px; margin-bottom: 15px; font-size: 24px;">
          ✈️ 🚢 🏨 🚗 ☀️
        </div>
        <h1 style="font-size: 36px; margin: 0 0 10px 0;">Hi, ${
          tripDetails.userName || "Traveler"
        }!</h1>
        <h2 style="font-size: 28px; margin: 0 0 10px 0;">${
          tripDetails.destination || "Your Destination"
        } Itinerary</h2>
        <p style="font-size: 18px; margin: 0;">${
          tripDetails.duration || "0 Days"
        } ${tripDetails.nights || "0 Nights"}</p>
      </div>

      <!-- Trip Overview Box -->
      <div style="border: 2px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px; background: white;">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; font-size: 12px;">
          <div><strong>Departure From:</strong><br/>${
            tripDetails.departureFrom || "N/A"
          }</div>
          <div><strong>Departure:</strong><br/>${
            tripDetails.departureDate || "N/A"
          }</div>
          <div><strong>Arrival:</strong><br/>${
            tripDetails.arrivalDate || "N/A"
          }</div>
          <div><strong>Destination:</strong><br/>${
            tripDetails.destinationCity || "N/A"
          }</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; font-size: 12px; margin-top: 15px;">
          <div><strong>No. Of Travellers:</strong><br/>${
            tripDetails.travelers || "N/A"
          }</div>
        </div>
      </div>

      <!-- Daily Itinerary -->
      <h2 style="font-size: 22px; margin: 30px 0 15px 0; color: #1f2937;">Daily Itinerary</h2>
      ${days
        .map(
          (day, index) => `
        <div style="border: 2px solid #60a5fa; border-radius: 12px; margin-bottom: 20px; overflow: hidden; display: flex; background: white;">
          <div style="background: #581c87; color: white; width: 60px; display: flex; align-items: center; justify-content: center; writing-mode: vertical-rl; font-size: 18px; font-weight: bold; padding: 20px 0;">
            Day ${index + 1}
          </div>
          <div style="flex: 1; padding: 20px;">
            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
              ${
                day.image
                  ? `
                <img src="${day.image}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;" onerror="this.style.display='none'" />
              `
                  : `
                <div style="width: 100px; height: 100px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 40px;">📍</div>
              `
              }
              <div>
                <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${
                  day.date || "Date TBD"
                }</div>
                <div style="font-size: 13px; color: #4b5563;">${
                  day.title || "Activity Title"
                }</div>
              </div>
            </div>
            <div style="margin-left: 115px;">
              ${
                day.morning
                  ? `
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #7c3aed; background: white;"></div>
                    <div style="width: 2px; height: 100%; background: #d1d5db;"></div>
                  </div>
                  <div style="flex: 1; padding-bottom: 10px;">
                    <strong style="font-size: 13px;">Morning</strong>
                    <p style="margin: 5px 0 0 0; font-size: 11px; color: #4b5563;">${day.morning}</p>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                day.afternoon
                  ? `
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #7c3aed; background: white;"></div>
                    <div style="width: 2px; height: 100%; background: #d1d5db;"></div>
                  </div>
                  <div style="flex: 1; padding-bottom: 10px;">
                    <strong style="font-size: 13px;">Afternoon</strong>
                    <p style="margin: 5px 0 0 0; font-size: 11px; color: #4b5563;">${day.afternoon}</p>
                  </div>
                </div>
              `
                  : ""
              }
              ${
                day.evening
                  ? `
                <div style="display: flex; gap: 10px;">
                  <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #7c3aed; background: white;"></div>
                  </div>
                  <div style="flex: 1;">
                    <strong style="font-size: 13px;">Evening</strong>
                    <p style="margin: 5px 0 0 0; font-size: 11px; color: #4b5563;">${day.evening}</p>
                  </div>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      `
        )
        .join("")}

      <!-- Flight Summary -->
      <h2 style="font-size: 22px; margin: 30px 0 15px 0; color: #1f2937;">Flight <span style="color: #7c3aed;">Summary</span></h2>
      ${flights
        .map(
          (flight) => `
        <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 15px; margin-bottom: 10px; font-size: 12px;">
          <strong>${flight.date || "TBD"}</strong> - ${
            flight.airline || "Airline"
          } ${flight.flightNo || ""} ${flight.route || ""}
        </div>
      `
        )
        .join("")}
      <p style="font-size: 10px; color: #6b7280; margin-top: 10px;">Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20g/25Kg Checked Baggage.</p>

      <!-- Hotel Bookings -->
      <h2 style="font-size: 22px; margin: 30px 0 15px 0; color: #1f2937;">Hotel <span style="color: #7c3aed;">Bookings</span></h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; font-size: 11px;">
        <thead>
          <tr style="background: #581c87; color: white;">
            <th style="padding: 12px; text-align: left;">City</th>
            <th style="padding: 12px; text-align: left;">Check In</th>
            <th style="padding: 12px; text-align: left;">Check Out</th>
            <th style="padding: 12px; text-align: left;">Nights</th>
            <th style="padding: 12px; text-align: left;">Hotel Name</th>
          </tr>
        </thead>
        <tbody>
          ${hotels
            .map(
              (hotel) => `
            <tr style="background: #faf5ff; border-bottom: 1px solid #e9d5ff;">
              <td style="padding: 10px;">${hotel.city || ""}</td>
              <td style="padding: 10px;">${hotel.checkIn || ""}</td>
              <td style="padding: 10px;">${hotel.checkOut || ""}</td>
              <td style="padding: 10px;">${hotel.nights || ""}</td>
              <td style="padding: 10px;">${hotel.hotelName || ""}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <!-- Payment Plan -->
      <h2 style="font-size: 22px; margin: 30px 0 15px 0; color: #1f2937;">Payment <span style="color: #7c3aed;">Plan</span></h2>
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border: 1px solid #e9d5ff;">
            <strong style="font-size: 12px;">Total Amount</strong><br/>
            <span style="font-size: 18px; font-weight: bold;">${
              payment.totalAmount || "N/A"
            }</span>
          </div>
          <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border: 1px solid #e9d5ff;">
            <strong style="font-size: 12px;">TCS</strong><br/>
            <span style="font-size: 14px;">${payment.tcs || "N/A"}</span>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background: #581c87; color: white;">
              <th style="padding: 10px; text-align: left; border-top-left-radius: 8px;">Installment</th>
              <th style="padding: 10px; text-align: left;">Amount</th>
              <th style="padding: 10px; text-align: left; border-top-right-radius: 8px;">Due Date</th>
            </tr>
          </thead>
          <tbody>
            ${payment.installments
              .map(
                (inst, index) => `
              <tr style="background: #faf5ff; border-bottom: 1px solid #e9d5ff;">
                <td style="padding: 10px;">Installment ${index + 1}</td>
                <td style="padding: 10px;">${inst.amount || ""}</td>
                <td style="padding: 10px;">${inst.dueDate || ""}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      ${
        inclusions || exclusions
          ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px; font-size: 11px;">
          ${
            inclusions
              ? `
            <div>
              <h3 style="font-size: 16px; margin-bottom: 10px;">Inclusions</h3>
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
                ${inclusions
                  .split("\n")
                  .filter((line) => line.trim())
                  .map(
                    (line) => `
                  <div style="margin-bottom: 5px;">• ${line.trim()}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }
          ${
            exclusions
              ? `
            <div>
              <h3 style="font-size: 16px; margin-bottom: 10px;">Exclusions</h3>
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
                ${exclusions
                  .split("\n")
                  .filter((line) => line.trim())
                  .map(
                    (line) => `
                  <div style="margin-bottom: 5px;">• ${line.trim()}</div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }
        </div>
      `
          : ""
      }

      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
        <h3 style="font-size: 24px; font-weight: bold; color: #7c3aed; margin: 0;">PLAN.PACK.GO!</h3>
      </div>
    </div>
  `;

  document.body.appendChild(pdfContent);

  // Use html2canvas and jsPDF
  import("html2canvas")
    .then(({ default: html2canvas }) => {
      import("jspdf").then(({ default: jsPDF }) => {
        html2canvas(pdfContent, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
              heightLeft -= pdfHeight;
            }

            const fileName = `${tripDetails.destination || "Itinerary"}_${
              tripDetails.userName || "Travel"
            }_Plan.pdf`;
            pdf.save(fileName);

            document.body.removeChild(pdfContent);
            alert("PDF generated successfully with Figma design!");
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
            document.body.removeChild(pdfContent);
            alert("Error generating PDF. Please check console for details.");
          });
      });
    })
    .catch((error) => {
      console.error("Error loading libraries:", error);
      document.body.removeChild(pdfContent);
      alert(
        "Error loading PDF libraries. Please ensure jspdf and html2canvas are installed."
      );
    });
};
