(function( global ) {

	l8r = {

		blockActions   : [],
		enqueued       : [],
		blockCallbacks : [],

		isBlocked : false,
		isDebug   : true,

		blockQueue: function( lastEnqueued )
		{
			l8r.isBlocked = true;
			l8r.console('log', 'Now blocked');

			while (l8r.blockCallbacks.length > 0)
			{
				l8r.blockCallbacks.call( window, lastEnqueued )
			}
		},

		addBlocker: function( actionName )
		{
			if (! l8r.isBlocker( actionName ))
			{
				l8r.blockActions.push( actionName );
			}
		},

		addBlockers: function( names )
		{
			for (var i = names.length - 1; i >= 0; i--)
			{
				l8r.addBlocker( names[i] );
			}
		},

		isBlocker: function( actionName )
		{
			return l8r.blockActions.indexOf( actionName ) >= 0;
		},

		getActionNameFromArgs: function( args )
		{
			return arguments.length > 1 ? arguments[ 1 ] : 'click';
		},

		nq: function( source )
		{
			var actionName = l8r.getActionNameFromArgs( arguments );

			if (! l8r.isBlocked)
			{
				var info = {
					source: source,
					action: actionName
				}

				l8r.enqueued.push(info);
				l8r.console('log', 'Enqueued action "%s" from %o', actionName, source);

				if (l8r.isBlocker( actionName ) || arguments[2] === true || (typeof arguments[2] === 'object' && arguments[3] === true))
				{
					l8r.blockQueue( info );
				}
			}

			return false;
		},

		getNext: function()
		{
			return l8r.hasNext() ? l8r.enqueued.shift() : null;
		},

		hasNext: function()
		{
			return l8r.enqueued.length > 0;
		},

		console: function()
		{
			if (typeof console !== "undefined" && arguments.length > 0 && l8r.isDebug) {
				var type = arguments[0];
				if (typeof console[ type ] === "function") {
					callParams = [];
					for (var i = 1; i < arguments.length; i++)
					{
						callParams[i-1] = arguments[i];
					}
					console[ type ].apply(console, callParams);
				}
				else
				{
					console.error("Attempt to use unsupported console message '%s'", type);
					if (console.trace) {
						console.trace();
					}
				}
			}
		}

	}

})();
