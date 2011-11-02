/*
	=============================================================================
	*****************************************************************************
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/

	Software distributed under the License is distributed on an "AS IS"
	basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
	License for the specific language governing rights and limitations
	under the License.

	The Original Code is JAvroPhonetic

	The Initial Developer of the Original Code is
	Rifat Nabi <to.rifat@gmail.com>

	Copyright (C) OmicronLab (http://www.omicronlab.com). All Rights Reserved.


	Contributor(s): ______________________________________.

	*****************************************************************************
	=============================================================================
*/

if(typeof OmicronLab === 'undefined') {
	console.error('Please include dependency js files');
}

OmicronLab.Avro.Parser = {
	data: OmicronLab.Avro.Phonetic.data,
	parse: function(input) {
		var fixed = this.fixString(input);
		var output = "";
		for(var cur = 0; cur < fixed.length; ++cur) {
			var start = cur, end = cur + 1, prev = start - 1;
			var matched = false;
			
			for(var i = 0; i < this.data.patterns.length; ++i) {
				var pattern = this.data.patterns[i];
				end = cur + pattern.find.length;
				if(end <= fixed.length && fixed.substring(start, end) == pattern.find) {
					prev = start - 1;
					for(var j = 0; j < pattern.rules.length; ++j) {
						var rule = pattern.rules[j];
						var replace = true;
						
						var chk = 0;
						
						for(var k=0; k < rule.matches.length; ++k) {
							var match = rule.matches[k];
							
							if(match.type === "suffix") {
								chk = end;
							} 
							// Prefix
							else {
								chk = prev;
							}
							
							// Beginning
							if(match.scope === "punctuation") {
								if(
									! (
										((chk < 0) && (match.type === "prefix")) || 
										((chk >= fixed.length) && (match.type === "suffix")) || 
										this.isPunctuation(fixed.charAt(chk))
									) ^ match.negative
								) {
									replace = false;
									break;
								}
							}
							// Vowel
							else if(match.scope === "vowel") {
								if(
									! (
										(
											(chk >= 0 && (match.type === "prefix")) || 
											(chk < fixed.length && (match.type === "suffix"))
										) && 
										this.isVowel(fixed.charAt(chk))
									) ^ match.negative
								) {
									replace = false;
									break;
								}
							}
							// Consonant
							else if(match.scope === "consonant") {
								if(
									! (
										(
											(chk >= 0 && (match.type === "prefix")) || 
											(chk < fixed.length && match.type === ("suffix"))
										) && 
										this.isConsonant(fixed.charAt(chk))
									) ^ match.negative
								) {
									replace = false;
									break;
								}
							}
							// Exact
							else if(match.scope === "exact") {
								var s, e;
								if(match.type === "suffix") {
									s = end;
									e = end + match.value.length;
								} 
								// Prefix
								else {
									s = start - match.value.length;
									e = start;
								}
								if(!this.isExact(match.value, fixed, s, e, match.negative)) {
									replace = false;
									break;
								}
							}
						}
						
						if(replace) {
							output += rule.replace;
							cur = end - 1;
							matched = true;
							break;
						}
						
					}
	
					if(matched == true) break;
					
					// Default
					output += pattern.replace;
					cur = end - 1;
					matched = true;
					break;
				}
			}
			
			if(!matched) {
				output += fixed.charAt(cur);
			}
		}
		return output;
	},
	fixString: function(input) {
		var fixed = '';
		for(var i=0; i < input.length; ++i) {
			var cChar = input.charAt(i);
			if(this.isCaseSensitive(cChar)) {
				fixed += cChar;
			} else {
				fixed += cChar.toLowerCase();
			}
		}
		return fixed;
	},
	isVowel: function(c) {
		return (this.data.vowel.indexOf(c.toLowerCase()) >= 0);
	},
	isConsonant: function(c) {
		return (this.data.consonant.indexOf(c.toLowerCase()) >= 0);
	},
	isPunctuation: function(c) {
		return (!(this.isVowel(c) || this.isConsonant(c)));
	},
	isExact: function(needle, heystack, start, end, not) {
		return ((start >= 0 && end < heystack.length && (heystack.substring(start, end)  === needle)) ^ not);
	},
	isCaseSensitive: function(c) {
		return (this.data.casesensitive.indexOf(c.toLowerCase()) >= 0);
	}
}