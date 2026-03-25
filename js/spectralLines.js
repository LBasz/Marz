var deps = ["./methods"];
for (var i = 0; i < deps.length; i++) {
    require(deps[i])();
}


function SpectralLines() {
    this.lines = [];
    this.types = {
        BOTH: 0,
        EMISSION: 1,
        ABSORPTION: 2
    };
    this.initialiseDefault();
}
/**
 * Adds a spectral line to the globally available array.
 *
 * @param id - the short name of the line (eg 'Lya')
 * @param name - the full name of the line (eg 'Lyman Alpha')
 * @param wavelength - the wavelength of the line
 * @param air - true if the wavelength is with respect to air, not the vacuum
 * @param type - whether this a line found in emission or absorption spectra, or both. Use. spectraLines.TYPES
 * @param enabled - whether or not to use the spectral line
 */
SpectralLines.prototype.addSpectralLine = function(id, label, name, wavelength, air, type, enabled, shortcut, displayLines) {
    if (id == null || label == null || name == null || wavelength == null || air == null || type == null) {
        console.warn('Not a valid line. A null was passed in.');
        return;
    }
    if (parseFloat(wavelength) == null || isNaN(parseFloat(wavelength))) {
        console.warn('Wavelength is not a valid number');
        return;
    }
    if (type < 0 || type > 2) {
        console.warn('Type is not valid');
        return;
    }

    if (air) {
        wavelength = convertSingleVacuumFromAir(wavelength);
    }
    if (displayLines == null || typeof displayLines == "undefined") {
        displayLines = [wavelength];
    } else if (air) {
        for (var i = 0; i < displayLines.length; i++) {
            displayLines[i] = convertSingleVacuumFromAir(displayLines[i])
        }
    }
    // Check if already exists.
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].id == id) {
            console.warn('Id of ' + id + ' already declared');
            return;
        } else if (this.lines[i].name == name) {
            console.warn('Name of ' + name + ' already declared');
            return;
        } else if (this.lines[i].wavelength == wavelength) {
            console.warn('Vacuum wavelength of ' + wavelength.toFixed(2) + ' already declared');
            return;
        }
    }
    this.lines.push({
        id: id,
        label: label,
        name: name,
        wavelength: wavelength,
        logWavelength: Math.log(wavelength)/Math.LN10,
        type: type,
        enabled: enabled,
        shortcut: shortcut,
        displayLines: displayLines
    });
};
SpectralLines.prototype.initialiseDefault = function() {
    this.addSpectralLine('B2960', 'B2960', 'Broad B2960', 2900.00, 0, 0, 1, 'shift+b');
    this.addSpectralLine('B3260', 'B3260', 'Broad B3260', 3260.00, 0, 0, 1, 'shift+b');
    this.addSpectralLine('BL3580', 'BL3580', 'Broad BL3580', 3580.00, 0, 0, 1, 'shift+b');
    // this.addSpectralLine('Lylim','Ly\u03B3', 'Lyman Limit',     912.0,    0, 0, 1, 'shift+y');
    this.addSpectralLine('Lyb','Ly\u03B2',   'Lyman Beta',     1025.722,  0, 0, 1, 'shift+y');
    this.addSpectralLine('Lya','Ly\u03B1',   'Lyman Alpha',    1215.670,  0, 0, 1, 'shift+l');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('Si1', 'SiI',    'Silicon 1',          1845.52,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2a', 'SiIIa', 'Silicon 2a',         1260.42,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2b', 'SiIIb', 'Silicon 2b',         1264.74,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2c', 'SiIIc', 'Silicon 2c',         1304.37,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2d', 'SiIId', 'Silicon 2d',         1309.28,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2e', 'SiIIe', 'Silicon 2e',         1526.71,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si2f', 'SiIIf', 'Silicon 2f',         1808.01,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si3', 'SiIII',  'Silicon 3',          1417.24,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si4a', 'SiIVa', 'Silicon 4a',         1393.76,    0, 0, 1, 'shift+s');
    this.addSpectralLine('Si4b', 'SiIVb', 'Silicon 4b',         1402.77,    0, 0, 1, 'shift+s');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('Fe2',  'FeII',  'Iron 2',             1608.45,      0, 0, 1, 'shift+12'); 
    this.addSpectralLine('Fe2a', 'FeIIa', 'Iron 2a',            2249.88,      0, 0, 1, 'shift+12'); 
    this.addSpectralLine('Fe2b', 'FeIIb', 'Iron 2b',            2260.78,      0, 0, 1, 'shift+11'); 
    this.addSpectralLine('Fe2c', 'FeIIc', 'Iron 2c',            2344.21,      0, 0, 1, 'shift+7'); 
    this.addSpectralLine('Fe2d', 'FeIId', 'Iron 2d',            2365.66,      0, 0, 1, 'shift+4'); 
    this.addSpectralLine('Fe2e', 'FeIIe', 'Iron 2e',            2374.46,      0, 0, 1, 'shift+1'); 
    this.addSpectralLine('Fe2f', 'FeIIf', 'Iron 2f',            2382.76,      0, 0, 1, 'shift+1'); 
    this.addSpectralLine('Fe2g', 'FeIIg', 'Iron 2g',            2396.15,      0, 0, 1, 'shift+1'); 
    this.addSpectralLine('Fe2h', 'FeIIh', 'Iron 2h',            2586.65,      0, 0, 1, 'shift+2'); 
    this.addSpectralLine('Fe2i', 'FeIIi', 'Iron 2i',            2600.17,      0, 0, 1, 'shift+3'); 
    this.addSpectralLine('Fe2j', 'FeIIj', 'Iron 2j',            2612.65,      0, 0, 1, 'shift+3'); 
    this.addSpectralLine('Fe2k', 'FeIIk', 'Iron 2k',            2626.45,      0, 0, 1, 'shift+3'); 
    ////////////////////////////////////////////////////////////////////////////
    //this.addSpectralLine('Mn2a', 'MnIIa', 'Manganese 2a',       2606,      0, 0, 1, 'shift+13'); 
    //this.addSpectralLine('Mn2b', 'MnIIb', 'Manganese 2b',       2594,      0, 0, 1, 'shift+14'); 
    //this.addSpectralLine('Mn2c', 'MnIIc', 'Manganese 2c',       2576,      0, 0, 1, 'shift+15'); 
    //this.addSpectralLine('ZnCr', 'ZnIICrII', 'combi 1',       2062,      0, 0, 1, 'shift+16'); 
    //this.addSpectralLine('ZnMg', 'ZnIIMgI',  'combi 2',       2026,      0, 0, 1, 'shift+17'); 
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('Al2',   'AlII', 'Aluminium 2',     1670.79,    0, 0, 1, 'shift+24');
    this.addSpectralLine('Al2_', 'AlII_', 'Aluminium 2_',    3584.00,    0, 0, 1, 'shift+24');
    this.addSpectralLine('Al3a', 'AlIIIa', 'Aluminium 3a',   1854.72,    0, 0, 1, 'shift+24');
    this.addSpectralLine('Al3b', 'AlIIIb', 'Aluminium 3b',   1862.79,    0, 0, 1, 'shift+24');
    //////////////////////////////////////////////////////////////////////////// 
    this.addSpectralLine('Ni2a', 'NiIIa', 'Nickel 2a',           1709.60,    0, 0, 1, 'shift+26'); 
    this.addSpectralLine('Ni2b', 'NiIIb', 'Nickel 2b',           1741.55,    0, 0, 1, 'shift+26'); 
    this.addSpectralLine('Ni2c', 'NiIIc', 'Nickel 2c',           1751.91,    0, 0, 1, 'shift+26'); 
    //////////////////////////////////////////////////////////////////////////// 
    this.addSpectralLine('C2',  'CII]',    'Carbon 2',          2326.00,     0, 0, 1, 'shift+c'); 
    this.addSpectralLine('C2a', 'CIIa',   'Carbon 2a',         1334.53,    0, 0, 1, 'shift+c'); 
    this.addSpectralLine('C2b', 'CIIb',   'Carbon 2b',         1335.1,    0, 0, 1, 'shift+c'); 
    this.addSpectralLine('C3',  'CIII]',   'Carbon 3',           1175.71,    0, 0, 1, 'shift+22'); 
    this.addSpectralLine('C3_', 'CIII]_',  'Carbon 3_',          2297.58,    0, 0, 1, 'shift+22'); 
    this.addSpectralLine('C3a', 'CIII]a',  'Carbon 3a',          1906.68,   0, 0, 1, 'shift+22');  
    this.addSpectralLine('C3b', 'CIII]b',  'Carbon 3b',          1908.68,   0, 0, 1, 'shift+21');    
    this.addSpectralLine('C4a', 'CIVa',  'Carbon 4a',           1548.20,   0, 0, 1, 'shift+c');
    this.addSpectralLine('C4b', 'CIVb',  'Carbon 4b',           1550.78,   0, 0, 1, 'shift+c');
    //////////////////////////////////////////////////////////////////////////// 
    this.addSpectralLine('Mg',   'Mg',      'Magnesium',           5175.3,    0, 0, 1, 'shift+j');
    this.addSpectralLine('Mg1',  'MgI',     'Magnesium 1',         2852.96,   0, 0, 1, 'shift+20'); 
    this.addSpectralLine('Mg1_', 'MgI_',    'Magnesium 1_',        3834.00,   0, 0, 1, 'shift+20'); 
    this.addSpectralLine('Mg2a', 'MgIIa',   'Magnesium 2a',        2796.35,   0, 0, 1, 'shift+m');
    this.addSpectralLine('Mg2b', 'MgIIb',   'Magnesium 2b',        2803.53,   0, 0, 1, 'shift+m');
    //////////////////////////////////////////////////////////////////////////// 
    this.addSpectralLine('He',    'He', 'Helium',          3970.00,    0, 0, 1, 'shift+5'); 
    this.addSpectralLine('He1',  'HeI', 'Helium 1',        5877.00,    0, 0, 1, 'shift+5'); 
    this.addSpectralLine('He2', 'HeII', 'Helium 2',        1640.42,    0, 0, 1, 'shift+5'); 
    //////////////////////////////////////////////////////////////////////////// 
    this.addSpectralLine('Hd',  'H\u03B4', 'Hydrogen Delta', 4101.70,   0, 0, 1, 'shift+d');
    this.addSpectralLine('Ha', 'H\u03B1',  'Hydrogen Alpha', 6562.82,      0, 0, 1, 'shift+a');
    this.addSpectralLine('Hg', 'H\u03B3',  'Hydrogen Gamma', 4340.00,   0, 0, 1, 'shift+f');
    this.addSpectralLine('Hb', 'H\u03B2',  'Hydrogen Beta',  4861.33,  0, 0, 1, 'shift+b');
    this.addSpectralLine('Hksi', 'Hksi', 'Hksi', 3889.00,    0, 0, 1, 'shift+xi');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('Ne3', '[NeIII]',  'Neon 3',        3869.81,   0, 0, 1, '[');
    this.addSpectralLine('CaFe', 'CaFe', 'CalciumIron',      5268.98, 0, 0, 1, 'shift+c');
    this.addSpectralLine('G',  'G',   'G',                   4304.4,    0, 0, 1, 'shift+g');
    this.addSpectralLine('Na', 'Na',  'Sodium',              5892.50,    0, 0, 1, 'shift+n');
    this.addSpectralLine('K',  'K',        'Potassium',           3933.663,  0, 0, 1, 'shift+k');
    this.addSpectralLine('H',  'H',        'Hydrogen',            3968.468,  0, 0, 1, 'shift+h');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('O1_', 'OI_',     'Oxygen 1_',           1302.17,    0, 0, 1, 'shift+27'); 
    this.addSpectralLine('O1', 'OI',       'Oxygen 1',            5578.0,    0, 0, 1, 'shift+27'); 
    this.addSpectralLine('O1a', 'OIa',     'Oxygen 1a',           6300.0,    0, 0, 1, 'shift+27'); 
    this.addSpectralLine('O1b', 'OIb',     'Oxygen 1b',           6363.0,    0, 0, 1, 'shift+27'); 
    this.addSpectralLine('O2a', '[OII]a',  'Oxygen 2a',           3726.03,  0, 0, 1, 'shift+25'); 
    this.addSpectralLine('O2b', '[OII]b',  'Oxygen 2b',           3728.82,  0, 0, 1, 'shift+o'); 
    //this.addSpectralLine('O32', 'OIII]', 'Oxygen 32',           1663.00,    0, 0, 1, 'shift+6'); 
    this.addSpectralLine('O3a', '[OIII]a', 'Oxygen 3a',           4958.91,  0, 0, 1, 'shift+u');
    this.addSpectralLine('O3b', '[OIII]b', 'Oxygen 3b',           5006.84,  0, 0, 1, 'shift+i');
    this.addSpectralLine('O4a',  'OIVa',   'Oxygen 4a',           1343.35,    0, 0, 1, 'shift+23'); 
    this.addSpectralLine('O4b',  'OIVb',   'Oxygen 4b',           1402.0,    0, 0, 1, 'shift+23'); 
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('N1',    'NI',     'Nitrogen 1',         6548.06,    0, 0, 1, 'shift+q');
    this.addSpectralLine('N2',  '[NII]',    'Nitrogen 2',         5756.0,    0, 0, 1, 'shift+q');
    this.addSpectralLine('N2a', '[NII]a',   'Nitrogen 2a',        6549.84,   0, 0, 1, 'shift+q');
    this.addSpectralLine('N2b', '[NII]b',   'Nitrogen 2b',        6585.23,   0, 0, 1, 'shift+w');
    this.addSpectralLine('N3',   'NIII',    'Nitrogen 3',         1750.0,    0, 0, 1, 'shift+24'); 
    this.addSpectralLine('N4',   'NIV',     'Nitrogen 4',         1718.55,   0, 0, 1, 'shift+24'); 
    this.addSpectralLine('N5a', '[NV]a',    'Nitrogen 5a',        1238.82,   0, 0, 1, 'shift+t');
    this.addSpectralLine('N5b', '[NV]b',    'Nitrogen 5b',        1242.80,   0, 0, 1, 'shift+t');
    this.addSpectralLine('NH',     'NH',    'NH',                    3360.00, 0, 0, 1, 'shift+c');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('S2a', '[SII]a',  'Sulfur 2a',  6716.00,   0, 0, 1, 'shift+z');
    this.addSpectralLine('S2b', '[SII]b',  'Sulfur 2b',  6731.30,   0, 0, 1, 'shift+x');
    this.addSpectralLine('S5',  '[SV]',    'Sulfur 5',   1501.76,   0, 0, 1, 'shift+x');
    ////////////////////////////////////////////////////////////////////////////
    this.addSpectralLine('Paa', 'P\u03B1', 'Paschen Alpha', 18750.0, 0, 0, 1, 'shift+p');
    this.addSpectralLine('Pab', 'P\u03B2', 'Paschen Beta', 12820.0, 0, 0, 1, 'shift+p');
    this.addSpectralLine('Pag', 'P\u03B3', 'Paschen Gamma', 10940.0, 0, 0, 1, 'shift+p');
    this.addSpectralLine('Pad', 'P\u03B4', 'Paschen Delta', 10050.0, 0, 0, 1, 'shift+p');
    this.addSpectralLine('Pae', 'P\u03B5', 'Paschen Epsilon', 9546.0, 0, 0, 1, 'shift+p');
    ////////////////////////////////////////////////////////////////////////////
};
SpectralLines.prototype.getAll = function() {
    return this.lines;
};
SpectralLines.prototype.getEnabled = function() {
    var result = [];
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].enabled) {
            result.push(this.lines[i]);
        }
    }
    return result;
};
SpectralLines.prototype.getFromID = function(id) {
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].id == id) {
            return this.lines[i];
        }
    }
    return null;
};
SpectralLines.prototype.getNext = function(id) {
    if (id == null) return null;
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].id == id) {
            return this.lines[(i + 1) % this.lines.length].id;
        }
    }
    return null;
};
SpectralLines.prototype.getPrevious = function(id) {
    if (id == null) return null;
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].id == id) {
            return this.lines[(i + this.lines.length - 1) % this.lines.length].id;
        }
    }
    return null;
};
SpectralLines.prototype.toggle = function(id) {
    for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].id == id) {
            this.lines[i].enabled = !this.lines[i].enabled;
            return;
        }
    }
};


module.exports = function() {
    this.SpectralLines = SpectralLines;
};
