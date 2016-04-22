var api = require('../api'), writeError = api.writeError;
var fs = require('fs');
var mDiff = require('diff');
var request = require('request');
var multiparty = require('multiparty');
var util = require('./util');
	var ignoreWS = query.ignoreWS === "true";
	var scope = util.decodeURIComponent(req.params.scope || "");
		filePath = api.toURLPath(filePath.substring(repo.workdir().length));
		var fileDir = api.toURLPath(path.join(fileRoot, repo.workdir().substring(req.user.workspaceDir.length + 1)));
		var includeURIs = parts.indexOf("uris") !== -1;
		var includeDiff = parts.indexOf("diff") !== -1;
		var includeDiffs = parts.indexOf("diffs") !== -1;
		var URIs, diffContents = [], diffs = [];
		if (includeURIs) {
			var p = path.join(fileDir, filePath);
			URIs = {
				"Base": getBaseLocation(scope, p),
				"CloneLocation": "/gitapi/clone" + fileDir,
				"Location": "/gitapi/diff/" + util.encodeURIComponent(scope) + fileDir + filePath,
				"New": getNewLocation(scope, p),
				"Old": getOldLocation(scope, p),
				"Type": "Diff"
			};
		}
		function done() {
			var body = "";
			if (includeDiff && includeURIs) {
				body += "--BOUNDARY\n";
				body += "Content-Type: application/json\n\n";
				body += JSON.stringify(URIs);
				body += "--BOUNDARY\n";
				body += "Content-Type: plain/text\n\n";
				body += diffContents.join("");
				res.setHeader('Content-Type', 'multipart/related; boundary="BOUNDARY"');
			} else if (includeDiff) {
				body += diffContents.join("");
				res.setHeader("Cache-Control", "no-cache");
				res.setHeader("Content-Disposition", "attachment; filename=\"changes.patch\"");
				res.setHeader('Content-Type', 'plain/text');
			} else if (includeDiffs) {
				var result = {
					"Type": "Diff",
					"Length": patches.length,
					"Children": diffs
				};
				if (i < patches.length) {
					result.NextLocation = "";
				}
				body += JSON.stringify(result);
				res.setHeader('Content-Type', 'application/json');
			} else if (includeURIs) {
				body += JSON.stringify(URIs);
				res.setHeader('Content-Type', 'application/json');
			}
			res.setHeader('Content-Length', body.length);
			return res.status(200).end(body);
		}
		if (includeDiff || includeDiffs) {
			var options = getOptions(ignoreWS, filePath, paths);
			if (scope.indexOf("..") !== -1) {
				diff = getDiffBetweenTwoCommits(repo, scope.split(".."), options);
			} else if (scope === "Default") {
				diff = getDiffBetweenWorkingTreeAndHead(repo, options);
			} else if (scope === "Cached") {
				diff = getDiffBetweenIndexAndHead(repo, options);
			} else {
				diff = getDiffBetweenWorkingTreeAndHead(repo, options);
			}
			return diff
			.then(function(diff) {
				return processDiff(diff, filePath, paths, fileDir, req, res, includeDiff, includeDiffs, query, scope, diffContents, diffs);
			})
			.then(done)
			.catch(function(err) {
				writeError(404, res, err.message);
			});
			done();
	})
	.catch(function(err) {
		writeError(404, res, err.message);
	if (patch.isAdded()) return "ADD";
	if (patch.isDeleted()) return "DELETE";
	if (patch.isModified()) return "MODIFY";
		return "/gitapi/commit/" + util.encodeURIComponent(commits[0]) + path + "?parts=body";
	return "/gitapi/commit/" + util.encodeURIComponent(scope) + path + "?parts=body";
		return "/gitapi/commit/" + util.encodeURIComponent(commits[1]) + path + "?parts=body";
		return "/gitapi/commit/" + util.encodeURIComponent(commits[1]) + path + "?parts=body";
function processDiff(diff, filePath, paths, fileDir, req, res, includeDiff, includeDiffs, query, scope, diffContents, diffs) {
	var patches = [], i;
	return diff.patches()
			// Need when both filePath and paths are set, otherwise options.pathspec will take care of filtering the patches

					var p1 = api.toURLPath(path.join(fileDir, type !== "Deleted" ? newFilePath : oldFilePath));
						"DiffLocation": "/gitapi/diff/" + util.encodeURIComponent(scope) + p1,
					if (patch.isAdded()) {
						buffer.push("new file mode " + newFile.mode().toString(8) + "\n");
					}
					if (patch.isDeleted()) {
						buffer.push("deleted file mode " + oldFile.mode().toString(8) + "\n");
					}
					buffer.push("index " + oldFile.id().toString().substring(0, 7) + ".." + newFile.id().toString().substring(0, 7)
						+ (patch.isDeleted() || patch.isAdded() ? "" : " " + newFile.mode().toString(8)) + "\n");
					buffer.push("--- " + (patch.isAdded() ? "/dev/null" : "a/" + oldFilePath) + "\n");
					buffer.push("+++ " + (patch.isDeleted() ? "/dev/null" : "b/" + newFilePath) + "\n"); 
											prefix = "";
									buffer.push(prefix + line.content());
function getOptions(ignoreWS, filePath, paths) {
	var options = {
		flags: ignoreWS ? git.Diff.OPTION.IGNORE_WHITESPACE : 0
	};
	if (filePath) {
		options.pathspec = filePath;	
	} else if (paths) {
		options.pathspec = paths;
	}
	return options;
}

function getDiffBetweenWorkingTreeAndIndex(repo, options) {
	options.flags |=
		git.Diff.OPTION.SHOW_UNTRACKED_CONTENT |
		git.Diff.OPTION.INCLUDE_UNTRACKED | 
		git.Diff.OPTION.RECURSE_UNTRACKED_DIRS |
		git.Diff.OPTION.IGNORE_SUBMODULES;
	return git.Diff.indexToWorkdir(repo, null, options);
}

function getDiffBetweenIndexAndHead(repo, options) {
	return repo.head()
	.then(function(ref) {
		return repo.getReferenceCommit(ref);
	})
	.then(function(commit) {
		return commit.getTree();
	})
	.then(function(tree) {
		return git.Diff.treeToIndex(repo, tree, null, options);
function getDiffBetweenWorkingTreeAndHead(repo, options) {
	options.flags |=
		git.Diff.OPTION.SHOW_UNTRACKED_CONTENT |
		git.Diff.OPTION.INCLUDE_UNTRACKED | 
		git.Diff.OPTION.RECURSE_UNTRACKED_DIRS |
		git.Diff.OPTION.IGNORE_SUBMODULES;
		return git.Diff.treeToWorkdir(repo, tree, options);
function getDiffBetweenTwoCommits(repo, commits, options) {
		return git.Diff.treeToTree(repo, tree1, tree2, options);
function applyPatch(req, res) {
	return clone.getRepo(req)
	.then(function(repo) {
		var radio = "", patchUrl = "", file = "";
		var form = new multiparty.Form();
		form.on("part", function(part) {
			if (part.name === "radio") {
				part.on("data", function(d) {
					radio += d;
				});
			}
			if (part.name === "url") {
				part.on("data", function(d) {
					patchUrl += d;
				});
			}
			if (part.name === "uploadedfile") {
				part.on("data", function(d) {
					file += d;
				});
			}
			part.resume();
		});
		form.on("error", function(err) {
			writeError(404, res, err.message);
		})
		form.on('close', function() {
			function apply() {
				var failed = [], successed = [];
				mDiff.applyPatches(file, {
					getUnprefixFile: function(f) {
						return f.split("/").slice(1).join("/");
					},
					getFile: function(f) {
						return path.join(repo.workdir(), this.getUnprefixFile(f));
					},
					loadFile: function(index, cb) {
						if (!index.oldFileName) {
							return cb({message: "Patch is not valid: missing old file name."});
						}
						if (index.oldFileName === "/dev/null") {
							return cb(null, "");
						}
						fs.readFile(this.getFile(index.oldFileName), "utf8", cb);
					},
					patched: function(index, content) {
						if (content === false) {
							failed.push(index);
							return;
						}
						if (!index.newFileName) {
							return cb({message: "Patch is not valid: missing new file name."});
						}
						successed.push(index);
						if (index.newFileName === "/dev/null") {
							fs.unlink(this.getFile(index.oldFileName));
							return;
						}
						fs.writeFile(this.getFile(index.newFileName), content, "utf8");
					},
					complete: function(err) {
						if (err) return writeError(404, res, err.message);
						var jsonData = {
							modifiedFiles: successed.map(function(index) {
								return this.getUnprefixFile(index.oldFileName);
							}.bind(this))
						};
						if (failed.length) {
							return res.status(400).json({
								Message: "Some files did not apply: " + failed.map(function(index) {
									return this.getUnprefixFile(index.oldFileName);
								}.bind(this)).join(","),
								HttpCode: 400,
								Code: 0,
								JsonData: jsonData
							})
						}
						res.status(200).json({
							Message: "Ok",
							HttpCode: 200,
							JsonData: jsonData
						});
					}
				});
			}
			if (radio === "fileRadio") {
				apply();
			} else if (radio === "urlRadio") {
				request(patchUrl, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						file = body;
						apply();
					} else {
						writeError(404, res, "Fail to fetch url");
					}
				});
			}
		});
		form.parse(req);
	})
	.catch(function(err) {
		writeError(404, res, err.message);
	})
}

	if (req.get('Content-Type').indexOf("multipart") === 0) {
		return applyPatch(req, res);
	}
	segments[3] = segments[3] + ".." + util.encodeURIComponent(newCommit);