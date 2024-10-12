import React from "react";

export default function TermsConditions() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-xl text-[#272727]">
        Terms and Conditions for Jaanavi Opticals
      </h2>{" "}
      <ol className="list-decimal ml-7">
        <li>
          {" "}
          Warranty on Frames All frames purchased from Jaanavi Opticals come
          with a 1-year unconditional warranty. This warranty covers any
          accidental damage from the customer's end, and we will replace the
          frame free of cost.{" "}
          <li>
            Warranty on Lenses 1.60 Lenses: Covered under the unconditional
            warranty. If they break, we will replace them free of cost. Other
            Lenses: Not covered under the unconditional warranty for breakage.
          </li>{" "}
          <li>
            Warranty on Coatings All lenses have a 1-year warranty on anti-glare
            and other similar coatings. If any coating peels off within this
            period, we will replace the lenses free of cost.
          </li>
          <li>
            {" "}
            Warranty on Sunglasses Polarized Sunglasses: Have a 6-month
            unconditional warranty. Other Sunglasses: Not covered under any
            warranty.
          </li>
          <li>
            Returns and Replacements Please note that we do not offer any
            returns or replacements once the order is confirmed and delivered.{" "}
          </li>
        </li>
      </ol>
      <p>
        {" "}
        These terms and conditions apply exclusively to purchases made from
        Jaanavi Opticals and may be subject to change at our discretion.
      </p>
    </div>
  );
}
