
'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Finanzierungsrechner() {
  const [preis, setPreis] = useState(27160);
  const [laufzeit, setLaufzeit] = useState(36);
  const [zins, setZins] = useState(4.9);
  const [ergebnis, setErgebnis] = useState(null);

  const berechneFinanzierung = () => {
    const r = zins / 100 / 12;
    const anzahlung = preis / 3;
    const finanzierungsbetrag = preis - anzahlung;
    const monatlicheRate = finanzierungsbetrag / laufzeit;
    const internFinanzierung =
      monatlicheRate * ((1 + r) ** laufzeit - 1) / (r * (1 + r) ** laufzeit);
    const nachlass = internFinanzierung - finanzierungsbetrag;
    const nachlassProzent = (nachlass / preis) * 100;

    setErgebnis({
      anzahlung: anzahlung.toFixed(2),
      monatlicheRate: monatlicheRate.toFixed(2),
      internFinanzierung: internFinanzierung.toFixed(2),
      nachlass: nachlass.toFixed(2),
      nachlassProzent: nachlassProzent.toFixed(2),
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Finanzierungsrechner</h1>
      <div className="grid grid-cols-1 gap-4">
        <Input
          type="number"
          value={preis}
          onChange={(e) => setPreis(parseFloat(e.target.value))}
          placeholder="Klavierpreis (€)"
        />
        <Input
          type="number"
          value={laufzeit}
          onChange={(e) => setLaufzeit(parseInt(e.target.value))}
          placeholder="Laufzeit (Monate)"
        />
        <Input
          type="number"
          value={zins}
          onChange={(e) => setZins(parseFloat(e.target.value))}
          placeholder="Zinssatz p.a. (%)"
        />
        <Button onClick={berechneFinanzierung}>Berechnen</Button>

        {ergebnis && (
          <Card>
            <CardContent className="p-4 space-y-2">
              <p><strong>Anzahlung:</strong> € {ergebnis.anzahlung}</p>
              <p><strong>Monatliche Rate (0%):</strong> € {ergebnis.monatlicheRate}</p>
              <p><strong>Interner Finanzierungsbetrag:</strong> € {ergebnis.internFinanzierung}</p>
              <p><strong>Benötigter Nachlass:</strong> € {ergebnis.nachlass}</p>
              <p><strong>Nachlass (%):</strong> {ergebnis.nachlassProzent} %</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
