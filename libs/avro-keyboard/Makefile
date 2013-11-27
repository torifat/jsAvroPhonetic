SRC_DIR = src
DIST_DIR = dist

JS_ENGINE ?= `which uglifyjs`
COMPILER = ${JS_ENGINE} --unsafe --no-copyright

VER = $(shell git describe --tags --abbrev=0)
MIN_HEAD = "/*! JS Avro Phonetic ${VER} http://omicronlab.com | https://raw.github.com/torifat/jsAvroPhonetic/master/MPL-1.1.txt */\n"

all: min tmpclean
	@@echo "Avro Phonetic JS Version "${VER}
clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
	@@mkdir -p ${DIST_DIR}

copy: clean
	@@echo "Versioning";
	@@cat ${SRC_DIR}/avro-lib.js > ${DIST_DIR}/avro-lib-${VER}.js
	@@cat ${SRC_DIR}/avro.jquery.js > ${DIST_DIR}/avro.jquery-${VER}.js
	@@cat ${SRC_DIR}/avro-bookmarklet.js > ${DIST_DIR}/avro-bookmarklet-${VER}.js
	@@sed '1,26d' ${DIST_DIR}/avro-lib-${VER}.js > tmp.js
	@@cat ${DIST_DIR}/avro.jquery-${VER}.js tmp.js > ${DIST_DIR}/avro-${VER}.js

min: copy
	@@if test ! -z ${JS_ENGINE}; then \
		echo "Minifying Library"; \
		${COMPILER} ${SRC_DIR}/avro-lib.js | \
		sed 's/find/f/g' | \
		sed 's/replace/r/g' | \
		sed 's/matches/m/g' | \
		sed 's/scope/s/g' | \
		sed 's/type/t/g' | \
		sed 's/tof/typeof/g' | \
		sed 's/rules/u/g' | \
		sed 's/vowel/v/g' | \
		sed 's/consonant/c/g' | \
		sed 's/punctuation/p/g' | \
		sed 's/exact/e/g' | \
		sed 's/suffix/s/g' | \
		sed 's/prefix/p/g' | \
		sed 's/prefix/p/g' | \
		sed 's/value/v/g' \
		> tmp.js; \
		echo ${MIN_HEAD}`cat tmp.js` > ${DIST_DIR}/avro-lib-${VER}.min.js; \
		echo "Minifying jQuery Plugins"; \
		${COMPILER} ${SRC_DIR}/avro.jquery.js > tmp2.js; \
		echo ${MIN_HEAD}`cat tmp2.js` > ${DIST_DIR}/avro.jquery-${VER}.min.js; \
		echo "Creating minified avro.js"; \
		echo ${MIN_HEAD}`cat tmp.js tmp2.js` > ${DIST_DIR}/avro-${VER}.min.js; \
		echo "Creating latest avro.js"; \
		cp ${DIST_DIR}/avro-${VER}.min.js ${DIST_DIR}/avro-latest.js; \
		echo "Minifying Bookmarklet"; \
		${COMPILER} ${SRC_DIR}/avro-bookmarklet.js > tmp.js; \
		echo "javascript:"`cat tmp.js` > ${DIST_DIR}/avro-bookmarklet-${VER}.min.js; \
	else \
		echo "You must have UglifyJS installed in order to minify Avro Phonetic JS."; \
	fi

tmpclean:
	@@echo "Cleaning all temp files"
	@@rm -f tmp.js tmp2.js;

tag:
	@@git tag -a -f -m "${VER}" ${VER}