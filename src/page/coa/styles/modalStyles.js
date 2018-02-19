const ModalStyles = {
	content : {
		position                   : 'absolute',
		zindex						: 9000,
		top                        : '400px',
		left                       : '300px',
		right                      : '40px',
		bottom                     : '20px',
		border                     : '1px solid #ccc',
		background                 : '#fff',
		overflow                   : 'auto',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '4px',
		outline                    : 'none',
		padding                    : '20px'
	},
	overlay : {
		position          : 'fixed',
		top               : 0,
		left              : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : '#666666'
	}
};
export default ModalStyles;