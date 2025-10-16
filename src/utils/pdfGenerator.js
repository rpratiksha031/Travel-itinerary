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
  pdfContent.style.fontFamily =
    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  pdfContent.innerHTML = `
    <div style="padding: 0; background: white;">
      <!-- Header Section with Logo and Gradient -->
      <div style="position: relative; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 50px 40px; border-radius: 0; color: white; margin-bottom: 0;">
        <!-- Logo Area -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; background: white; padding: 15px 30px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #667eea;">
              <span style="color: #764ba2;">Vigovia</span>
            </h1>
            <p style="margin: 5px 0 0 0; font-size: 10px; color: #666; letter-spacing: 2px;">PLAN.PACK.GO</p>
          </div>
        </div>
        
        <!-- Travel Icons -->
        <div style="text-align: center; margin-bottom: 25px;">
          <span style="font-size: 28px; margin: 0 8px;">✈️</span>
          <span style="font-size: 28px; margin: 0 8px;">🏨</span>
          <span style="font-size: 28px; margin: 0 8px;">🎫</span>
          <span style="font-size: 28px; margin: 0 8px;">🚗</span>
          <span style="font-size: 28px; margin: 0 8px;">🗺️</span>
        </div>
        
        <!-- Title Section -->
        <div style="text-align: center;">
          <h1 style="font-size: 42px; margin: 0 0 15px 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            Hi, ${tripDetails.userName || "Traveler"}!
          </h1>
          <h2 style="font-size: 36px; margin: 0 0 10px 0; font-weight: 600;">
            ${tripDetails.destination || "Your Destination"} Itinerary
          </h2>
          <p style="font-size: 22px; margin: 0; opacity: 0.95; font-weight: 500;">
            ${tripDetails.duration || "0 Days"} ${
    tripDetails.nights || "0 Nights"
  }
          </p>
        </div>
        
        <!-- Decorative Wave -->
        <div style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 30px; background: white; border-radius: 0;">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style="height: 100%; width: 100%;">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style="fill: white;"></path>
          </svg>
        </div>
      </div>

     
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px;">
          <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #667eea;">
            <div style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Departure From</div>
            <div style="font-size: 16px; color: #2d3748; font-weight: bold;">${
              tripDetails.departureFrom || "N/A"
            }</div>
          </div>
          <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #764ba2;">
            <div style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Destination</div>
            <div style="font-size: 16px; color: #2d3748; font-weight: bold;">${
              tripDetails.destinationCity || "N/A"
            }</div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
          <div style="background: linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #f093fb;">
            <div style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Departure Date</div>
            <div style="font-size: 14px; color: #2d3748; font-weight: bold;">${
              tripDetails.departureDate || "N/A"
            }</div>
          </div>
          <div style="background: linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #f5576c;">
            <div style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Arrival Date</div>
            <div style="font-size: 14px; color: #2d3748; font-weight: bold;">${
              tripDetails.arrivalDate || "N/A"
            }</div>
          </div>
          <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); padding: 18px; border-radius: 10px; border-left: 4px solid #667eea;">
            <div style="font-size: 11px; color: #666; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">No. Of Travellers</div>
            <div style="font-size: 14px; color: #2d3748; font-weight: bold;">${
              tripDetails.travelers || "N/A"
            }</div>
          </div>
        </div>
      </div>

      <!-- Daily Itinerary Section -->
      <div style="margin: 40px 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Daily Itinerary
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        ${days
          .map(
            (day, index) => `
          <div style="margin-bottom: 25px; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0; position: relative;">
            <!-- Day Badge Ribbon -->
            <div style="position: absolute; top: 20px; left: -8px; background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%); color: white; padding: 8px 20px; font-weight: bold; font-size: 14px; box-shadow: 3px 3px 10px rgba(76,29,149,0.3); z-index: 10; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);">
              DAY ${index + 1}
            </div>
            
            <div style="display: flex; padding: 30px 30px 30px 70px;">
              <!-- Image Circle -->
              <div style="flex-shrink: 0; margin-right: 25px;">
                ${
                  day.image
                    ? `<img src="${day.image}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 5px solid #667eea; box-shadow: 0 5px 15px rgba(102,126,234,0.3);" onerror="this.style.display='none'" />`
                    : `<div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 50px; border: 5px solid #667eea; box-shadow: 0 5px 15px rgba(102,126,234,0.3);">📍</div>`
                }
              </div>
              
              <!-- Content -->
              <div style="flex: 1;">
                <!-- Date and Title -->
                <div style="margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: inline-block; padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: bold; margin-bottom: 10px; box-shadow: 0 3px 10px rgba(102,126,234,0.3);">
                    📅 ${day.date || "Date TBD"}
                  </div>
                  <div style="font-size: 18px; color: #2d3748; font-weight: bold; margin-top: 8px;">
                    ${day.title || "Activity Title"}
                  </div>
                </div>
                
                <!-- Timeline -->
                <div style="position: relative; padding-left: 30px;">
                  ${
                    day.morning
                      ? `
                    <div style="position: relative; margin-bottom: 20px;">
                      <div style="position: absolute; left: -30px; top: 5px; width: 14px; height: 14px; border-radius: 50%; background: white; border: 3px solid #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.2);"></div>
                      <div style="position: absolute; left: -24px; top: 20px; width: 2px; height: calc(100% + 10px); background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);"></div>
                      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 15px; border-radius: 10px; border-left: 4px solid #f59e0b;">
                        <div style="font-size: 13px; font-weight: bold; color: #92400e; margin-bottom: 5px; display: flex; align-items: center;">
                          <span style="margin-right: 8px;">🌅</span> Morning
                        </div>
                        <div style="font-size: 11px; color: #451a03; line-height: 1.6;">${day.morning}</div>
                      </div>
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    day.afternoon
                      ? `
                    <div style="position: relative; margin-bottom: 20px;">
                      <div style="position: absolute; left: -30px; top: 5px; width: 14px; height: 14px; border-radius: 50%; background: white; border: 3px solid #764ba2; box-shadow: 0 0 0 3px rgba(118,75,162,0.2);"></div>
                      <div style="position: absolute; left: -24px; top: 20px; width: 2px; height: calc(100% + 10px); background: linear-gradient(180deg, #764ba2 0%, #f093fb 100%);"></div>
                      <div style="background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%); padding: 15px; border-radius: 10px; border-left: 4px solid #8b5cf6;">
                        <div style="font-size: 13px; font-weight: bold; color: #5b21b6; margin-bottom: 5px; display: flex; align-items: center;">
                          <span style="margin-right: 8px;">☀️</span> Afternoon
                        </div>
                        <div style="font-size: 11px; color: #3730a3; line-height: 1.6;">${day.afternoon}</div>
                      </div>
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    day.evening
                      ? `
                    <div style="position: relative;">
                      <div style="position: absolute; left: -30px; top: 5px; width: 14px; height: 14px; border-radius: 50%; background: white; border: 3px solid #f093fb; box-shadow: 0 0 0 3px rgba(240,147,251,0.2);"></div>
                      <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); padding: 15px; border-radius: 10px; border-left: 4px solid #ec4899;">
                        <div style="font-size: 13px; font-weight: bold; color: #9f1239; margin-bottom: 5px; display: flex; align-items: center;">
                          <span style="margin-right: 8px;">🌆</span> Evening
                        </div>
                        <div style="font-size: 11px; color: #831843; line-height: 1.6;">${day.evening}</div>
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Flight Summary Section -->
      <div style="margin: 40px 30px; page-break-before: always;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Flight <span style="color: #764ba2;">Summary</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        ${flights
          .map(
            (flight, idx) => `
          <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 2px solid #c4b5fd; border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; align-items: center; box-shadow: 0 3px 10px rgba(196,181,253,0.2);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 8px; margin-right: 20px; font-weight: bold; font-size: 13px; min-width: 110px; text-align: center; box-shadow: 0 3px 10px rgba(102,126,234,0.3);">
              ${flight.date || "TBD"}
            </div>
            <div style="flex: 1;">
              <div style="font-size: 14px; font-weight: bold; color: #5b21b6; margin-bottom: 5px;">
                ✈️ ${flight.airline || "Airline"} ${flight.flightNo || ""}
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${flight.route || "Route information"}
              </div>
            </div>
          </div>
        `
          )
          .join("")}
        
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 15px; border-radius: 10px; margin-top: 20px; border-left: 4px solid #3b82f6;">
          <div style="font-size: 10px; color: #1e40af; line-height: 1.6;">
            <strong>📋 Note:</strong> All Flights Include Meals, Seat Choice (Excluding XL), And 20g/25Kg Checked Baggage.
          </div>
        </div>
      </div>

      <!-- Hotel Bookings Section -->
      <div style="margin: 40px 30px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Hotel <span style="color: #764ba2;">Bookings</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%); color: white;">
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">🏙️ CITY</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">📅 CHECK IN</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">📅 CHECK OUT</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">🌙 NIGHTS</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">🏨 HOTEL NAME</th>
              </tr>
            </thead>
            <tbody>
              ${hotels
                .map(
                  (hotel, idx) => `
                <tr style="background: ${
                  idx % 2 === 0 ? "#faf5ff" : "#f3e8ff"
                }; border-bottom: 1px solid #e9d5ff;">
                  <td style="padding: 15px; font-size: 12px; color: #2d3748; font-weight: 600;">${
                    hotel.city || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #4b5563;">${
                    hotel.checkIn || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #4b5563;">${
                    hotel.checkOut || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #4b5563; font-weight: bold;">${
                    hotel.nights || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #2d3748; font-weight: 600;">${
                    hotel.hotelName || ""
                  }</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 20px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #3b82f6;">
          <div style="font-size: 10px; color: #1e40af; line-height: 1.8;">
            <div style="margin-bottom: 5px;">✓ All Hotels Are Tentative And Can Be Replaced With Similar.</div>
            <div style="margin-bottom: 5px;">✓ Breakfast Included For All Hotel Stays</div>
            <div style="margin-bottom: 5px;">✓ All Hotels Will Be 4* And Above Category</div>
            <div>✓ A maximum occupancy of 2 people/room is allowed in most hotels.</div>
          </div>
        </div>
      </div>

      <!-- Activity Table Section -->
      ${
        activities.length > 0 && activities[0].city
          ? `
      <div style="margin: 40px 30px; page-break-before: always;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Activity <span style="color: #764ba2;">Table</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%); color: white;">
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">🏙️ CITY</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">🎯 ACTIVITY</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">📋 TYPE</th>
                <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">⏱️ TIME REQUIRED</th>
              </tr>
            </thead>
            <tbody>
              ${activities
                .map(
                  (activity, idx) => `
                <tr style="background: ${
                  idx % 2 === 0 ? "#faf5ff" : "#f3e8ff"
                }; border-bottom: 1px solid #e9d5ff;">
                  <td style="padding: 15px; font-size: 11px; color: #2d3748; font-weight: 600;">${
                    activity.city || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #4b5563;">${
                    activity.activity || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #4b5563;">${
                    activity.type || ""
                  }</td>
                  <td style="padding: 15px; font-size: 11px; color: #2d3748; font-weight: 600;">${
                    activity.duration || ""
                  }</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      `
          : ""
      }

      <!-- Payment Plan Section -->
      <div style="margin: 40px 30px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Payment <span style="color: #764ba2;">Plan</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; border: 2px solid #f59e0b; text-align: center; box-shadow: 0 3px 10px rgba(245,158,11,0.2);">
              <div style="font-size: 12px; font-weight: 600; color: #78350f; margin-bottom: 10px; letter-spacing: 1px;">💰 TOTAL AMOUNT</div>
              <div style="font-size: 24px; font-weight: bold; color: #92400e;">${
                payment.totalAmount || "N/A"
              }</div>
            </div>
            <div style="background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%); padding: 25px; border-radius: 12px; border: 2px solid #8b5cf6; text-align: center; box-shadow: 0 3px 10px rgba(139,92,246,0.2);">
              <div style="font-size: 12px; font-weight: 600; color: #4c1d95; margin-bottom: 10px; letter-spacing: 1px;">📊 TCS</div>
              <div style="font-size: 18px; font-weight: bold; color: #5b21b6;">${
                payment.tcs || "N/A"
              }</div>
            </div>
          </div>
          
          <div style="background: white; border-radius: 12px; overflow: hidden; border: 2px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%); color: white;">
                  <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">💳 INSTALLMENT</th>
                  <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">💵 AMOUNT</th>
                  <th style="padding: 15px; text-align: left; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">📅 DUE DATE</th>
                </tr>
              </thead>
              <tbody>
                ${payment.installments
                  .map(
                    (inst, idx) => `
                  <tr style="background: ${
                    idx % 2 === 0 ? "#faf5ff" : "#f3e8ff"
                  }; border-bottom: 1px solid #e9d5ff;">
                    <td style="padding: 15px; font-size: 12px; color: #2d3748; font-weight: 600;">Installment ${
                      idx + 1
                    }</td>
                    <td style="padding: 15px; font-size: 12px; color: #4b5563; font-weight: bold;">${
                      inst.amount || ""
                    }</td>
                    <td style="padding: 15px; font-size: 11px; color: #4b5563;">${
                      inst.dueDate || ""
                    }</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Inclusions & Exclusions Section -->
      ${
        inclusions || exclusions
          ? `
      <div style="margin: 40px 30px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
          ${
            inclusions
              ? `
          <div>
            <div style="text-align: center; margin-bottom: 20px;">
              <h3 style="font-size: 22px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 8px;">
                ✅ Inclusions
                <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 3px; background: linear-gradient(90deg, #10b981, #059669); border-radius: 2px;"></div>
              </h3>
            </div>
            <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #10b981; border-radius: 12px; padding: 25px; box-shadow: 0 3px 10px rgba(16,185,129,0.2);">
              ${inclusions
                .split("\n")
                .filter((line) => line.trim())
                .map(
                  (line) => `
                <div style="margin-bottom: 12px; padding-left: 25px; position: relative; font-size: 11px; color: #065f46; line-height: 1.6;">
                  <span style="position: absolute; left: 0; top: 2px; font-size: 14px;">✓</span>
                  ${line.trim()}
                </div>
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
            <div style="text-align: center; margin-bottom: 20px;">
              <h3 style="font-size: 22px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 8px;">
                ❌ Exclusions
                <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60px; height: 3px; background: linear-gradient(90deg, #ef4444, #dc2626); border-radius: 2px;"></div>
              </h3>
            </div>
            <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 25px; box-shadow: 0 3px 10px rgba(239,68,68,0.2);">
              ${exclusions
                .split("\n")
                .filter((line) => line.trim())
                .map(
                  (line) => `
                <div style="margin-bottom: 12px; padding-left: 25px; position: relative; font-size: 11px; color: #7f1d1d; line-height: 1.6;">
                  <span style="position: absolute; left: 0; top: 2px; font-size: 14px;">✗</span>
                  ${line.trim()}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }
        </div>
      </div>
      `
          : ""
      }

      <!-- Important Notes Section -->
      ${
        importantNotes.length > 0 && importantNotes[0].point
          ? `
      <div style="margin: 40px 30px; page-break-before: always;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Important <span style="color: #764ba2;">Notes</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0;">
          ${importantNotes
            .map(
              (note, idx) => `
            <div style="background: ${
              idx % 2 === 0 ? "#fef3c7" : "#fde68a"
            }; border-bottom: 2px solid #f59e0b; padding: 20px; display: flex; gap: 20px;">
              <div style="flex-shrink: 0; width: 40px; height: 40px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 3px 10px rgba(245,158,11,0.3);">
                ${idx + 1}
              </div>
              <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: bold; color: #92400e; margin-bottom: 8px;">
                  📌 ${note.point || ""}
                </div>
                <div style="font-size: 11px; color: #78350f; line-height: 1.6;">
                  ${note.details || ""}
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

      <!-- Scope of Service Section -->
      ${
        scopeOfService.length > 0 && scopeOfService[0].service
          ? `
      <div style="margin: 40px 30px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="font-size: 28px; margin: 0; color: #2d3748; font-weight: 700; display: inline-block; position: relative; padding-bottom: 10px;">
            Scope Of <span style="color: #764ba2;">Service</span>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 2px;"></div>
          </h2>
        </div>
        
        <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 2px solid #e2e8f0;">
          ${scopeOfService
            .map(
              (scope, idx) => `
            <div style="background: ${
              idx % 2 === 0 ? "#ddd6fe" : "#c4b5fd"
            }; border-bottom: 2px solid #8b5cf6; padding: 20px; display: flex; gap: 20px; align-items: center;">
              <div style="flex-shrink: 0; width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; box-shadow: 0 3px 10px rgba(139,92,246,0.3);">
                🎯
              </div>
              <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: bold; color: #5b21b6; margin-bottom: 6px;">
                  ${scope.service || ""}
                </div>
                <div style="font-size: 11px; color: #4c1d95; line-height: 1.6;">
                  ${scope.details || ""}
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      `
          : ""
      }

      <!-- Footer Section -->
      <div style="margin: 60px 30px 30px 30px; text-align: center; border-top: 3px solid #e2e8f0; padding-top: 40px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); display: inline-block; padding: 20px 50px; border-radius: 20px; box-shadow: 0 10px 30px rgba(102,126,234,0.3);">
          <h2 style="margin: 0; font-size: 32px; font-weight: bold; color: white; letter-spacing: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            PLAN.PACK.GO!
          </h2>
          <div style="margin-top: 10px; font-size: 12px; color: white; opacity: 0.9; letter-spacing: 1px;">
            ✨ Travel Made Simple ✨
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #f59e0b; display: inline-block;">
          <div style="font-size: 11px; color: #92400e; line-height: 1.8; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 13px;">📞 Contact Information</div>
            <div>For any queries, please reach out to your travel coordinator</div>
            <div style="margin-top: 5px; font-weight: bold; color: #78350f;">Happy Travels! 🌍✈️</div>
          </div>
        </div>
        
        <div style="margin-top: 25px; font-size: 9px; color: #9ca3af;">
          Generated with ❤️ by VigoVia Travel Services | ${new Date().toLocaleDateString()}

        </div>
    
        
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
          backgroundColor: "#ffffff",
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

            // Success notification
            const notification = document.createElement("div");
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 20px 30px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(16,185,129,0.3);
              z-index: 10000;
              font-family: 'Segoe UI', sans-serif;
              font-weight: bold;
              font-size: 14px;
            `;
            notification.innerHTML = "✅ PDF Generated Successfully!";
            document.body.appendChild(notification);

            setTimeout(() => {
              document.body.removeChild(notification);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
            document.body.removeChild(pdfContent);

            // Error notification
            const notification = document.createElement("div");
            notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
              color: white;
              padding: 20px 30px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(239,68,68,0.3);
              z-index: 10000;
              font-family: 'Segoe UI', sans-serif;
              font-weight: bold;
              font-size: 14px;
            `;
            notification.innerHTML =
              "❌ Error generating PDF. Please try again.";
            document.body.appendChild(notification);

            setTimeout(() => {
              document.body.removeChild(notification);
            }, 3000);
          });
      });
    })
    .catch((error) => {
      console.error("Error loading libraries:", error);
      document.body.removeChild(pdfContent);

      // Library error notification
      const notification = document.createElement("div");
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(245,158,11,0.3);
        z-index: 10000;
        font-family: 'Segoe UI', sans-serif;
        font-weight: bold;
        font-size: 14px;
      `;
      notification.innerHTML =
        "⚠️ Error loading PDF libraries. Please ensure jspdf and html2canvas are installed.";
      document.body.appendChild(notification);

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 5000);
    });
};
