function Formula(formula) {
    let k=0, b=0;
    this.compileFormula = function () {
        // The right hand side of the formula
        // RHS -> kx+b
        let RHS = formula.split("=")[1], compiledFormula;
        // y = kx
        // y = x && y = b && y = -x
        // y = kx+b
        // y = kx-b
        let spPlus = RHS.split("+");
        let spMinus = RHS.split("-");
        // y = x & y = b
        if (RHS.length === 1) {
            // y = x
            if (RHS === "x") {
                k = 1;
            }
            // y = b
            else {
                b = parseInt(RHS);
            }
        }
        // y = -x
        else if (RHS==="-x") {
            k = -1;
        }
        // y=kx
        else if(spPlus.length === 1 && spMinus.length === 1) {
            k = parseInt(RHS.substring(0, RHS.length-1));
        }
        // y = kx+b
        else if(spPlus.length === 2) {
            // y=kx+b
            // y=x+b
            // y=-x+b
            let kx = spPlus[0];
            let pb = spPlus[1];
            // y=x+b
            if (kx === "x") {
                k = 1;
                b = parseInt(pb);
            }
            // y=-x+b
            else if(kx ==="-x") {
                k = -1;
                b = parseInt(pb);
            }
            // y=kx+b
            else {
                k = parseInt(kx.substring(0, kx.length-1));
                b = parseInt(pb);
            }
        }
        // y=kx-b
        else if(spMinus.length >= 2) {
            // y=kx-b
            // y=-b
            // y=-kx-b
            // y = -b
            if (spMinus[0] === "" && spMinus.length === 2) {
                b = -1 * parseInt(spMinus[1]);
            }
            // y = -kx-b
            else if (spMinus.length === 3) {
                // y = -x-b
                if (spMinus[1] === "x") {
                    k = -1;
                }
                // y = -kx-b
                else {
                    k = -1 * parseInt(
                        spMinus[1].substring(
                            0,
                            spMinus[1].length-1
                        )
                    );
                }
                b = -1 * parseInt(spMinus[2]);
            }
            // y = kx-b
            else {
                k = parseInt(spMinus[0]);
                b = -1 * parseInt(spMinus[1]);
            }
        }
    };
    this.calculate = function (x) {
        return k * x + b;
    };
    this.compileFormula();
}
