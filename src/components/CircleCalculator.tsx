import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Circle, RotateCcw } from 'lucide-react';

const CircleCalculator = () => {
  const [diameter, setDiameter] = useState<string>('');
  const [area, setArea] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateArea = () => {
    const d = parseFloat(diameter);
    if (d && d > 0) {
      setIsCalculating(true);
      // Add a slight delay for visual feedback
      setTimeout(() => {
        const radius = d / 2;
        const calculatedArea = Math.PI * radius * radius;
        setArea(calculatedArea);
        setIsCalculating(false);
      }, 300);
    }
  };

  const reset = () => {
    setDiameter('');
    setArea(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setDiameter(value);
      if (area !== null) {
        setArea(null);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateArea();
    }
  };

  // Visual circle size for display (capped for reasonable sizes)
  const getCircleSize = () => {
    if (!diameter || !parseFloat(diameter)) return 80;
    const d = parseFloat(diameter);
    return Math.min(Math.max(d * 8, 40), 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8 backdrop-blur-sm bg-card/95 border-border/50 shadow-elegant">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <Circle className="h-8 w-8 text-mathematical animate-float" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-mathematical to-accent bg-clip-text text-transparent">
                Circle Area Calculator
              </h1>
            </div>
            <p className="text-muted-foreground">
              Enter the diameter to calculate the area of a circle
            </p>
          </div>

          {/* Visual Circle Display */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="rounded-full border-4 border-mathematical/30 bg-mathematical/10 transition-all duration-500 ease-out animate-pulse-gentle"
                style={{
                  width: `${getCircleSize()}px`,
                  height: `${getCircleSize()}px`,
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mathematical/20 to-accent/20"></div>
              </div>
              {diameter && parseFloat(diameter) > 0 && (
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-geometric">
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-geometric bg-background px-2 py-1 rounded">
                    d = {diameter}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Formula Display */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Formula:</span>
              <span className="text-mathematical font-mono">A = π × (d/2)²</span>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diameter" className="text-sm font-medium">
                Diameter
              </Label>
              <Input
                id="diameter"
                type="number"
                placeholder="Enter diameter..."
                value={diameter}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="text-lg h-12 border-2 focus:border-mathematical transition-colors"
                min="0"
                step="any"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={calculateArea}
                disabled={!diameter || parseFloat(diameter) <= 0 || isCalculating}
                variant="mathematical"
                className="flex-1 h-12"
              >
                <Calculator className="h-5 w-5 mr-2" />
                {isCalculating ? 'Calculating...' : 'Calculate Area'}
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="h-12 px-6"
                disabled={!diameter && area === null}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Result Section */}
          {area !== null && (
            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Result</h3>
                <div className="bg-gradient-to-r from-mathematical/10 to-accent/10 rounded-lg p-6 border border-mathematical/20">
                  <div className="text-3xl font-bold text-mathematical mb-2">
                    {area.toFixed(6)}
                  </div>
                  <div className="text-sm text-muted-foreground">square units</div>
                </div>
              </div>

              {/* Calculation Steps */}
              <div className="bg-muted/30 rounded-lg p-4 text-sm space-y-2">
                <div className="font-medium text-center mb-3">Calculation Steps:</div>
                <div className="space-y-1 font-mono text-center">
                  <div>Radius = Diameter ÷ 2 = {diameter} ÷ 2 = {(parseFloat(diameter) / 2).toFixed(3)}</div>
                  <div>Area = π × r² = π × {(parseFloat(diameter) / 2).toFixed(3)}²</div>
                  <div>Area = π × {((parseFloat(diameter) / 2) ** 2).toFixed(6)}</div>
                  <div className="text-mathematical font-semibold">Area = {area.toFixed(6)} square units</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CircleCalculator;