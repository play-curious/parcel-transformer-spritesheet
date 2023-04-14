"use strict";

const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset, logger }) {
    // Retrieve the asset JSON code and parse it
    const source = await asset.getCode();
    const parsed = JSON.parse(source);

    // Replace the filename in meta.image with a dependency reference
    const imageDep = parsed.meta.image;
    const dependencyId = asset.addURLDependency(imageDep);
    parsed.meta.image = dependencyId;
    logger.verbose({
      message: "Added dependency for " + imageDep + " id " + dependencyId,
    });

    // Update the asset
    asset.setCode(JSON.stringify(parsed, null, 2));

    // Return the asset
    return [asset];
  },
});
