//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GreatWarriorDataAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class GamesHistory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GamesHistory()
        {
            this.FiguresInGames = new HashSet<FiguresInGame>();
        }
    
        public string Player_One_Email { get; set; }
        public string Player_Two_Email { get; set; }
        public System.DateTime Game_Date { get; set; }
        public string Winner_Player { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FiguresInGame> FiguresInGames { get; set; }
        public virtual Player Player { get; set; }
        public virtual Player Player1 { get; set; }
    }
}
